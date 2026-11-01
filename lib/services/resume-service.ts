import { db } from '@/lib/db';

const resume_include = {
  sections: { orderBy: { order: 'asc' as const } },
  analysisResults: { orderBy: { createdAt: 'desc' as const }, take: 1 },
  verificationClaims: true,
  user: true,
};

export const owned_resume_where = (user_id: string, resume_id: string) => ({
  id: resume_id,
  userId: user_id,
});

export const get_owned_resume = async (user_id: string, resume_id: string) => {
  return db.resume.findFirst({
    where: owned_resume_where(user_id, resume_id),
    include: resume_include,
  });
};

export async function getResumeWithSections(userId: string, resumeId: string) {
  return get_owned_resume(userId, resumeId);
}

export async function getUserResumes(userId: string) {
  return db.resume.findMany({
    where: { userId },
    include: {
      sections: { orderBy: { order: 'asc' } },
      analysisResults: { orderBy: { createdAt: 'desc' }, take: 1 },
      verificationClaims: true,
    },
    orderBy: { updatedAt: 'desc' },
  });
}

export const section_belongs_to_user = async (user_id: string, section_id: string) => {
  return db.resumeSection.findFirst({
    where: { id: section_id, resume: { userId: user_id } },
  });
};

export async function updateResumeSection(userId: string, sectionId: string, content: unknown) {
  const owned = await section_belongs_to_user(userId, sectionId);
  if (!owned) return null;
  const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
  return db.resumeSection.update({
    where: { id: sectionId },
    data: { content: contentStr },
  });
}

export async function createResumeSection(
  userId: string,
  resumeId: string,
  sectionType: string,
  order: number,
  content: unknown
) {
  const resume = await get_owned_resume(userId, resumeId);
  if (!resume) return null;
  const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
  return db.resumeSection.create({
    data: { resumeId, sectionType, order, content: contentStr },
  });
}

export async function reorderSections(userId: string, sectionOrders: { id: string; order: number }[]) {
  const ids = sectionOrders.map((item) => item.id);
  const owned = await db.resumeSection.findMany({
    where: { id: { in: ids }, resume: { userId } },
    select: { id: true },
  });
  if (owned.length !== ids.length) return null;
  const updates = sectionOrders.map((item) =>
    db.resumeSection.update({
      where: { id: item.id },
      data: { order: item.order },
    })
  );
  return db.$transaction(updates);
}

export const format_resume_list_item = (resume: {
  id: string;
  title: string;
  template: string;
  isActive: boolean;
  updatedAt: Date;
  analysisResults?: { atsScore: number }[];
  verificationClaims?: { status: string }[];
}) => {
  const claims = resume.verificationClaims || [];
  const verified = claims.filter((claim) => claim.status === 'verified').length;
  const trustScore = claims.length ? Math.round((verified / claims.length) * 100) : 0;
  return {
    id: resume.id,
    title: resume.title,
    template: resume.template,
    isActive: resume.isActive,
    updatedAt: resume.updatedAt.toISOString(),
    atsScore: resume.analysisResults?.[0]?.atsScore ?? 0,
    trustScore,
  };
};
