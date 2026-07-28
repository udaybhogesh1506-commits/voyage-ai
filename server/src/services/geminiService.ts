import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is missing from the server/.env file"
  );
}

const ai = new GoogleGenAI({
  apiKey,
});

interface TripInput {
  destination: string;
  budget: string;
  travelers: string;
}

interface PackingListInput {
  destination: string;
  travelers: string;
  itinerary?: string;
}

interface HotelRecommendationsInput {
  destination: string;
  budget: string;
  travelers: string;
  itinerary?: string;
}

interface LocalGuideInput {
  destination: string;
  budget: string;
  travelers: string;
  itinerary?: string;
}

interface BudgetEstimateInput {
  destination: string;
  budget: string;
  travelers: string;
  itinerary?: string;
}

export const generateTripItinerary = async ({
  destination,
  budget,
  travelers,
}: TripInput): Promise<string> => {
  const prompt = `
Create a practical and personalized travel itinerary.

Destination: ${destination}
Total budget: ${budget}
Number of travelers: ${travelers}

Create a detailed 3-day itinerary.

Use exactly this structure:

Day 1
Morning:
Afternoon:
Evening:

Day 2
Morning:
Afternoon:
Evening:

Day 3
Morning:
Afternoon:
Evening:

Requirements:
- Keep the plan realistic and budget-friendly.
- Recommend famous attractions and useful local experiences.
- Include food suggestions.
- Keep travel distances practical.
- Use simple, easy-to-understand language.
- Do not use markdown tables.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

  const itinerary =
    response.text?.trim();

  if (!itinerary) {
    throw new Error(
      "Gemini returned an empty itinerary"
    );
  }

  return itinerary;
};

export const generateTripPackingList = async ({
  destination,
  travelers,
  itinerary,
}: PackingListInput): Promise<string> => {
  const prompt = `
Create a practical packing list for this trip.

Destination: ${destination}
Number of travelers: ${travelers}
Trip itinerary:
${itinerary || "No itinerary provided"}

Use exactly these sections:

Essential Documents
Clothing
Toiletries
Electronics
Health and Safety
Destination-Specific Items

Requirements:
- Put each packing item on a separate line.
- Begin every item with "- ".
- Recommend only useful and realistic items.
- Consider the destination and planned activities.
- Do not use markdown tables.
- Use simple, easy-to-understand language.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

  const packingList =
    response.text?.trim();

  if (!packingList) {
    throw new Error(
      "Gemini returned an empty packing list"
    );
  }

  return packingList;
};

export const generateHotelRecommendations =
  async ({
    destination,
    budget,
    travelers,
    itinerary,
  }: HotelRecommendationsInput): Promise<string> => {
    const prompt = `
Recommend suitable hotels for this trip.

Destination: ${destination}
Total trip budget: ${budget}
Number of travelers: ${travelers}
Trip itinerary:
${itinerary || "No itinerary provided"}

Recommend exactly 5 hotels or suitable accommodation options.

For every recommendation, use this structure:

Hotel Name:
Area:
Estimated Price Per Night:
Suitable For:
Nearby Attractions:
Why It Is Recommended:

Requirements:
- Include budget, mid-range, and premium options.
- Keep the suggestions relevant to the travel budget.
- Recommend convenient and safe areas.
- Mention that prices are estimates and may change.
- Do not claim live availability.
- Do not provide booking links.
- Do not use markdown tables.
- Use simple, easy-to-understand language.
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

    const hotelRecommendations =
      response.text?.trim();

    if (!hotelRecommendations) {
      throw new Error(
        "Gemini returned empty hotel recommendations"
      );
    }

    return hotelRecommendations;
  };

export const generateLocalGuide = async ({
  destination,
  budget,
  travelers,
  itinerary,
}: LocalGuideInput): Promise<string> => {
  const prompt = `
Create a useful local travel guide for this trip.

Destination: ${destination}
Total trip budget: ${budget}
Number of travelers: ${travelers}
Trip itinerary:
${itinerary || "No itinerary provided"}

Use exactly these sections:

RESTAURANTS

Recommend exactly 5 restaurants.

For every restaurant, use this structure:

Restaurant Name:
Area:
Cuisine:
Estimated Cost Per Person:
Recommended Dish:
Why Visit:

TOURIST ATTRACTIONS

Recommend exactly 5 tourist attractions.

For every attraction, use this structure:

Attraction Name:
Area:
Estimated Entry Cost:
Best Time to Visit:
Suggested Duration:
Why Visit:

LOCAL TIPS

Provide exactly 5 useful local travel tips.

Requirements:
- Keep all recommendations relevant to the destination.
- Include budget-friendly and popular options.
- Consider the provided itinerary.
- Prices must be clearly described as estimates.
- Do not claim live availability or real-time prices.
- Do not provide booking links.
- Do not use markdown tables.
- Use simple, easy-to-understand language.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

  const localGuide =
    response.text?.trim();

  if (!localGuide) {
    throw new Error(
      "Gemini returned an empty local guide"
    );
  }

  return localGuide;
};

export const generateBudgetEstimate =
  async ({
    destination,
    budget,
    travelers,
    itinerary,
  }: BudgetEstimateInput): Promise<string> => {
    const prompt = `
Create a realistic estimated budget breakdown for this trip.

Destination: ${destination}
User's total budget: ${budget}
Number of travelers: ${travelers}
Trip itinerary:
${itinerary || "No itinerary provided"}

Use exactly this structure:

BUDGET SUMMARY

User's Budget:
Estimated Trip Cost:
Estimated Remaining Amount:
Budget Status:

COST BREAKDOWN

Accommodation:
Food:
Local Transport:
Activities and Entry Fees:
Shopping and Souvenirs:
Emergency Reserve:

PER TRAVELER ESTIMATE

Estimated Cost Per Traveler:

MONEY-SAVING TIPS

Provide exactly 5 practical money-saving tips.

Requirements:
- Base the estimate on a 3-day trip.
- Clearly state the currency used.
- Use the destination's commonly used currency when helpful.
- Also show an approximate amount in the currency used in the user's budget when it can be identified.
- Keep all amounts realistic but clearly label them as estimates.
- Consider the destination, group size, itinerary, and stated budget.
- State whether the trip is within budget, close to budget, or over budget.
- Do not claim live or guaranteed prices.
- Do not use markdown tables.
- Use simple, easy-to-understand language.
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

    const budgetEstimate =
      response.text?.trim();

    if (!budgetEstimate) {
      throw new Error(
        "Gemini returned an empty budget estimate"
      );
    }

    return budgetEstimate;
  };