// Thin repository layer — swap for Supabase later without touching components.
export interface CommunityApplication {
  name: string;
  email: string;
  linkedin?: string;
  role: string;
  company: string;
  country: string;
  interest: string;
  contributionType: string;
}
export interface UseCaseSubmission {
  title: string;
  industry: string;
  problem: string;
  agentHelp: string;
  governanceConcerns: string;
  expectedValue: string;
}
export interface ContributionSubmission {
  pathId: string;
  name: string;
  email: string;
  message: string;
}

const log = (label: string, payload: unknown) => {
  // eslint-disable-next-line no-console
  console.info(`[HAD] ${label}`, payload);
};

export async function submitCommunityApplication(p: CommunityApplication) {
  log("community-application", p);
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}
export async function submitUseCase(p: UseCaseSubmission) {
  log("use-case-submission", p);
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}
export async function submitContribution(p: ContributionSubmission) {
  log("contribution", p);
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}
