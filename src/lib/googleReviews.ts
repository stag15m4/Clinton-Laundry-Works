/** Fetched only while exporting the static site. Never sent to the browser. */

export type GoogleReview = {
  name?: string;
  rating?: number;
  text?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string };
  googleMapsUri?: string;
  relativePublishTimeDescription?: string;
};

type PlaceReviews = {
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
};

export async function getGoogleReviews(): Promise<PlaceReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) {
      console.warn(`Google reviews unavailable (HTTP ${response.status}).`);
      return null;
    }
    const data: PlaceReviews = await response.json();
    return data;
  } catch {
    console.warn("Google reviews unavailable; showing Google profile links instead.");
    return null;
  }
}
