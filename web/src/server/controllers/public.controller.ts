import { Request, Response } from "express";
import {
  CollaborationModel,
  PricingPlanModel,
  ProjectModel,
  ServiceModel,
  SiteSettingsModel,
  TeamMemberModel,
  TestimonialModel,
} from "../models";
import { asyncHandler } from "../utils/asyncHandler";

export const getHomepageData = asyncHandler(async (_req: Request, res: Response) => {
  const [settings, services, projects, collaborations, pricing, team, testimonials] = await Promise.all([
    SiteSettingsModel.findOne().sort({ createdAt: 1 }).lean(),
    ServiceModel.find().sort({ order: 1 }).limit(6).lean(),
    ProjectModel.find()
      .select("title slug summary thumbnailUrl tags techStack viewLiveUrl demoUrl featured order seo")
      .sort({ featured: -1, createdAt: -1 })
      .limit(6)
      .lean(),
    CollaborationModel.find().sort({ order: 1 }).lean(),
    PricingPlanModel.find().sort({ order: 1 }).lean(),
    TeamMemberModel.find({ type: "TEAM" }).sort({ order: 1 }).limit(4).lean(),
    TestimonialModel.find({ visible: true }).sort({ order: 1, createdAt: -1 }).limit(8).lean(),
  ]);

  res.json({
    settings,
    services,
    projects,
    collaborations,
    pricing,
    team,
    testimonials,
  });
});
