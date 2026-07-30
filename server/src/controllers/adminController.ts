import {
  Request,
  Response,
} from "express";

import User from "../models/User";

export const getAdminDashboard =
  async (
    _req: Request,
    res: Response
  ) => {
    try {
      const thirtyDaysAgo =
        new Date();

      thirtyDaysAgo.setDate(
        thirtyDaysAgo.getDate() -
          30
      );

      const [
        totalUsers,
        adminUsers,
        recentlyActiveUsers,
        loginStatistics,
        users,
      ] = await Promise.all([
        User.countDocuments(),

        User.countDocuments({
          role: "admin",
        }),

        User.countDocuments({
          lastLogin: {
            $gte: thirtyDaysAgo,
          },
        }),

        User.aggregate([
          {
            $group: {
              _id: null,

              totalLogins: {
                $sum: {
                  $ifNull: [
                    "$loginCount",
                    0,
                  ],
                },
              },
            },
          },
        ]),

        User.find()
          .select(
            "_id name email role createdAt updatedAt lastLogin loginCount"
          )
          .sort({
            createdAt: -1,
          })
          .limit(200)
          .lean(),
      ]);

      const totalLogins =
        loginStatistics[0]
          ?.totalLogins || 0;

      return res.status(200).json({
        success: true,

        statistics: {
          totalUsers,
          regularUsers:
            totalUsers -
            adminUsers,
          adminUsers,
          recentlyActiveUsers,
          totalLogins,
        },

        users: users.map(
          (user) => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            registeredAt:
              user.createdAt,
            lastLogin:
              user.lastLogin,
            loginCount:
              user.loginCount || 0,
          })
        ),
      });
    } catch (error) {
      console.error(
        "ADMIN DASHBOARD ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load admin dashboard",
      });
    }
  };