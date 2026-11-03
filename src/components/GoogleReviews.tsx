import { business } from "@/content/site";
import { getGoogleReviews } from "@/lib/googleReviews";
import { Section } from "./Section";

export async function GoogleReviews() {
  const data = await getGoogleReviews();
  const rating = data?.rating;
  const hasRating = typeof rating === "number" && Number.isFinite(rating) && rating >= 1 && rating <= 5;
  const reviews = (Array.isArray(data?.reviews) ? data.reviews : []).filter(
    (review) => typeof review.rating === "number" && review.rating >= 4 && review.rating <= 5 && review.text?.text?.trim(),
  );
  const linkClass = "inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600";

  return (
    <Section id="reviews" title="What our customers say" tone="muted">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-slate-900">Google reviews</p>
          {hasRating ? (
            <p className="mt-2 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold">{rating.toFixed(1)}<span className="text-base font-normal text-slate-500"> / 5</span></span>
              <span aria-hidden="true" className="text-xl text-amber-500">★</span>
              {typeof data?.userRatingCount === "number" && <span className="text-slate-600">Based on {data.userRatingCount} Google {data.userRatingCount === 1 ? "review" : "reviews"}</span>}
            </p>
          ) : (
            <p className="mt-2 text-slate-600">Visited us recently? Share your experience on Google.</p>
          )}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={business.googleProfileUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} border border-slate-300 text-slate-700 hover:bg-white`}>Read all reviews</a>
          <a href={business.googleReviewUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} bg-brand-600 text-white hover:bg-brand-700`}>Leave a review</a>
        </div>
      </div>
      {reviews.length > 0 && (
        <>
          <p className="mt-8 text-sm text-slate-500">Featured 4- and 5-star reviews. The overall rating above includes all Google ratings.</p>
          <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <figure key={review.name ?? index} className="min-w-0 rounded-xl border border-slate-200 bg-white p-6">
                <p aria-label={`${review.rating} out of 5 stars`} className="text-lg text-amber-500">{"★".repeat(Math.round(review.rating!))}</p>
                <blockquote className="mt-4 whitespace-pre-line break-words leading-relaxed text-slate-700">{review.text!.text}</blockquote>
                <figcaption className="mt-5 text-sm">
                  <a href={review.authorAttribution?.uri ?? business.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 underline underline-offset-2">{review.authorAttribution?.displayName ?? "Google reviewer"}</a>
                  {review.relativePublishTimeDescription && <p className="mt-1 text-slate-500">{review.relativePublishTimeDescription}</p>}
                  <a href={review.googleMapsUri ?? business.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-brand-700 underline underline-offset-2">View on Google Maps</a>
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      )}
      {hasRating && <p className="mt-6 text-xs text-slate-500">Google Maps · Rating and featured reviews as of {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" })}.</p>}
    </Section>
  );
}
