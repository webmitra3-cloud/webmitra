import { SiteSettings, HomepageData, PaginatedResponse, PricingPlan, Project, Service, TeamMember } from "@/types";
import { connectDatabase } from "../config/db";
import {
  CollaborationModel,
  PricingPlanModel,
  ProjectModel,
  ServiceModel,
  SiteSettingsModel,
  TeamMemberModel,
  TestimonialModel,
} from "../models";

function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export async function getPublicSettingsData(): Promise<SiteSettings | null> {
  await connectDatabase();
  const settings = await SiteSettingsModel.findOne().sort({ createdAt: 1 }).lean();
  return serialize(settings as SiteSettings | null);
}

export async function getHomepagePageData(): Promise<HomepageData> {
  await connectDatabase();
  const [settings, services, projects, collaborations, pricing, team, testimonials] = await Promise.all([
    SiteSettingsModel.findOne().sort({ createdAt: 1 }).lean(),
    ServiceModel.find().sort({ order: 1 }).limit(6).lean(),
    ProjectModel.find()
      .select("title slug summary thumbnailUrl tags techStack viewLiveUrl demoUrl featured order seo createdAt")
      .sort({ featured: -1, createdAt: -1 })
      .limit(6)
      .lean(),
    CollaborationModel.find().sort({ order: 1 }).lean(),
    PricingPlanModel.find().sort({ order: 1 }).lean(),
    TeamMemberModel.find({ type: "TEAM" }).sort({ order: 1 }).limit(4).lean(),
    TestimonialModel.find({ visible: true }).sort({ order: 1, createdAt: -1 }).limit(8).lean(),
  ]);

  return serialize<HomepageData>({
    settings,
    services,
    projects,
    collaborations,
    pricing,
    team,
    testimonials,
  } as unknown as HomepageData);
}

export async function getServicesPageData(): Promise<{
  settings: SiteSettings | null;
  services: Service[];
}> {
  await connectDatabase();
  const [settings, services] = await Promise.all([
    SiteSettingsModel.findOne().sort({ createdAt: 1 }).lean(),
    ServiceModel.find().sort({ order: 1, createdAt: -1 }).lean(),
  ]);

  return serialize<{ settings: SiteSettings | null; services: Service[] }>({
    settings,
    services,
  } as unknown as { settings: SiteSettings | null; services: Service[] });
}

export async function getProjectsPageData(params?: {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
}): Promise<{
  settings: SiteSettings | null;
  projects: PaginatedResponse<Project>;
}> {
  await connectDatabase();

  const page = Math.max(1, Number(params?.page ?? 1));
  const limit = Math.min(100, Math.max(1, Number(params?.limit ?? 9)));
  const skip = (page - 1) * limit;
  const search = (params?.search || "").trim();
  const tag = (params?.tag || "").trim();

  const filter: Record<string, unknown> = {};
  if (tag) {
    filter.tags = { $in: [tag] };
  }
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { summary: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }

  const [settings, items, total] = await Promise.all([
    SiteSettingsModel.findOne().sort({ createdAt: 1 }).lean(),
    ProjectModel.find(filter)
      .select("title slug summary thumbnailUrl tags techStack viewLiveUrl demoUrl featured order seo createdAt")
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    ProjectModel.countDocuments(filter),
  ]);

  return serialize<{
    settings: SiteSettings | null;
    projects: PaginatedResponse<Project>;
  }>({
    settings,
    projects: {
      items,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    },
  } as unknown as {
    settings: SiteSettings | null;
    projects: PaginatedResponse<Project>;
  });
}

export async function getProjectDetailPageData(slug: string): Promise<{
  settings: SiteSettings | null;
  project: Project | null;
}> {
  await connectDatabase();
  const [settings, project] = await Promise.all([
    SiteSettingsModel.findOne().sort({ createdAt: 1 }).lean(),
    ProjectModel.findOne({ slug }).lean(),
  ]);

  return serialize<{ settings: SiteSettings | null; project: Project | null }>({
    settings,
    project,
  } as unknown as { settings: SiteSettings | null; project: Project | null });
}

export async function getProjectSlugs(): Promise<string[]> {
  await connectDatabase();
  const slugs = await ProjectModel.find().select("slug").sort({ createdAt: -1 }).lean();
  return slugs.map((item) => item.slug);
}

export async function getAboutPageData(): Promise<{
  settings: SiteSettings | null;
  team: TeamMember[];
}> {
  await connectDatabase();
  const [settings, team] = await Promise.all([
    SiteSettingsModel.findOne().sort({ createdAt: 1 }).lean(),
    TeamMemberModel.find({ type: "TEAM" }).sort({ order: 1, createdAt: -1 }).limit(3).lean(),
  ]);

  return serialize<{ settings: SiteSettings | null; team: TeamMember[] }>({
    settings,
    team,
  } as unknown as { settings: SiteSettings | null; team: TeamMember[] });
}

export async function getPricingPageData(): Promise<{
  settings: SiteSettings | null;
  pricing: PricingPlan[];
}> {
  await connectDatabase();
  const [settings, pricing] = await Promise.all([
    SiteSettingsModel.findOne().sort({ createdAt: 1 }).lean(),
    PricingPlanModel.find().sort({ order: 1, createdAt: -1 }).lean(),
  ]);

  return serialize<{ settings: SiteSettings | null; pricing: PricingPlan[] }>({
    settings,
    pricing,
  } as unknown as { settings: SiteSettings | null; pricing: PricingPlan[] });
}

export async function getTeamPageData(): Promise<{
  settings: SiteSettings | null;
  team: TeamMember[];
  board: TeamMember[];
}> {
  await connectDatabase();
  const [settings, team, board] = await Promise.all([
    SiteSettingsModel.findOne().sort({ createdAt: 1 }).lean(),
    TeamMemberModel.find({ type: "TEAM" }).sort({ order: 1, createdAt: -1 }).lean(),
    TeamMemberModel.find({ type: "BOARD" }).sort({ order: 1, createdAt: -1 }).lean(),
  ]);

  return serialize<{
    settings: SiteSettings | null;
    team: TeamMember[];
    board: TeamMember[];
  }>({
    settings,
    team,
    board,
  } as unknown as { settings: SiteSettings | null; team: TeamMember[]; board: TeamMember[] });
}
