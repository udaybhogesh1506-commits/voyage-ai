import {
  Request,
  Response,
} from "express";

import {
  generateTripItinerary,
  generateTripPackingList,
  generateHotelRecommendations,
  generateLocalGuide,
  generateBudgetEstimate,
} from "../services/geminiService";

export const generateItinerary = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      destination,
      budget,
      travelers,
    } = req.body;

    if (
      !destination ||
      !budget ||
      !travelers
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Destination, budget, and travelers are required",
      });
    }

    const itinerary =
      await generateTripItinerary({
        destination,
        budget,
        travelers,
      });

    return res.status(200).json({
      success: true,
      itinerary,
    });
  } catch (error) {
    console.log(
      "AI ITINERARY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate AI itinerary",
    });
  }
};

export const generatePackingList = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      destination,
      travelers,
      itinerary,
    } = req.body;

    if (!destination || !travelers) {
      return res.status(400).json({
        success: false,
        message:
          "Destination and travelers are required",
      });
    }

    const packingList =
      await generateTripPackingList({
        destination,
        travelers,
        itinerary,
      });

    return res.status(200).json({
      success: true,
      packingList,
    });
  } catch (error) {
    console.log(
      "AI PACKING LIST ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate AI packing list",
    });
  }
};

export const generateHotels = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      destination,
      budget,
      travelers,
      itinerary,
    } = req.body;

    if (
      !destination ||
      !budget ||
      !travelers
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Destination, budget, and travelers are required",
      });
    }

    const hotelRecommendations =
      await generateHotelRecommendations({
        destination,
        budget,
        travelers,
        itinerary,
      });

    return res.status(200).json({
      success: true,
      hotelRecommendations,
    });
  } catch (error) {
    console.log(
      "AI HOTEL RECOMMENDATIONS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate hotel recommendations",
    });
  }
};

export const generateGuide = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      destination,
      budget,
      travelers,
      itinerary,
    } = req.body;

    if (
      !destination ||
      !budget ||
      !travelers
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Destination, budget, and travelers are required",
      });
    }

    const localGuide =
      await generateLocalGuide({
        destination,
        budget,
        travelers,
        itinerary,
      });

    return res.status(200).json({
      success: true,
      localGuide,
    });
  } catch (error) {
    console.log(
      "AI LOCAL GUIDE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate the local guide",
    });
  }
};

export const generateBudget = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      destination,
      budget,
      travelers,
      itinerary,
    } = req.body;

    if (
      !destination ||
      !budget ||
      !travelers
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Destination, budget, and travelers are required",
      });
    }

    const budgetEstimate =
      await generateBudgetEstimate({
        destination,
        budget,
        travelers,
        itinerary,
      });

    return res.status(200).json({
      success: true,
      budgetEstimate,
    });
  } catch (error) {
    console.log(
      "AI BUDGET ESTIMATE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate the budget estimate",
    });
  }
};