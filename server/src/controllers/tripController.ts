import {
  Request,
  Response,
} from "express";

import Trip from "../models/Trip";

// Save Trip
export const saveTrip = async (
  req: Request,
  res: Response
) => {
  try {
    const userId =
      (req as any).userId;

    const {
      destination,
      budget,
      travelers,
      itinerary,
    } = req.body;

    if (
      !destination ||
      !budget ||
      !travelers ||
      !itinerary
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All trip details are required",
      });
    }

    const trip = await Trip.create({
      userId,
      destination,
      budget,
      travelers,
      itinerary,
      isFavorite: false,
    });

    return res.status(201).json({
      success: true,
      message:
        "Trip saved successfully",
      trip,
    });
  } catch (error) {
    console.log(
      "SAVE TRIP ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Trip save failed",
    });
  }
};

// Get Logged-In User Trips
export const getTrips = async (
  req: Request,
  res: Response
) => {
  try {
    const userId =
      (req as any).userId;

    const trips = await Trip.find({
      userId,
    }).sort({
      isFavorite: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      trips,
    });
  } catch (error) {
    console.log(
      "GET TRIPS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Trips fetch failed",
    });
  }
};

// Get Single Logged-In User Trip
export const getTripById = async (
  req: Request,
  res: Response
) => {
  try {
    const userId =
      (req as any).userId;

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    return res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.log(
      "GET TRIP ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Trip fetch failed",
    });
  }
};

// Toggle Favorite Trip
export const toggleFavoriteTrip = async (
  req: Request,
  res: Response
) => {
  try {
    const userId =
      (req as any).userId;

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    trip.isFavorite =
      !trip.isFavorite;

    await trip.save();

    return res.status(200).json({
      success: true,
      message: trip.isFavorite
        ? "Trip added to favorites"
        : "Trip removed from favorites",
      trip,
    });
  } catch (error) {
    console.log(
      "TOGGLE FAVORITE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update favorite trip",
    });
  }
};

// Delete Logged-In User Trip
export const deleteTrip = async (
  req: Request,
  res: Response
) => {
  try {
    const userId =
      (req as any).userId;

    const trip =
      await Trip.findOneAndDelete({
        _id: req.params.id,
        userId,
      });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trip deleted",
    });
  } catch (error) {
    console.log(
      "DELETE TRIP ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Trip delete failed",
    });
  }
};