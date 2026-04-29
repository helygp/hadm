import JSZip from "jszip";
import { artifacts } from "@/data/artifacts";
import { artifactBodies } from "@/content/artifactBodies";
import { toolkits } from "@/data/toolkits";
import { resolveToolFile } from "@/lib/toolFiles";
import { downloadBlob } from "@/lib/download";

export async function buildStarterKitZip(): Promise<Blob> {
  const zip = new JSZip();
  zip.file(
    "README.md",
    `# HAD Starter Kit

Human-Governed Agentic Delivery — complete artifact bundle.

Generated: ${new Date().toISOString()}

Contents:
- /artifacts — manifesto, canvas, prompts, agents, checklists, templates
- /toolkits — tool-specific instruction files for Claude, OpenAI, Gemini, Lovable, Cursor, Copilot, Windsurf, Replit, n8n
`,
  );
  const a = zip.folder("artifacts")!;
  for (const art of artifacts) {
    const body = artifactBodies[art.bodyKey];
    if (body) a.file(`${art.id}.md`, body);
  }
  const t = zip.folder("toolkits")!;
  for (const kit of toolkits) {
    const folder = t.folder(kit.id)!;
    for (const f of kit.files) folder.file(f.name, resolveToolFile(kit, f));
  }
  return zip.generateAsync({ type: "blob" });
}

export async function downloadStarterKit() {
  const blob = await buildStarterKitZip();
  await downloadBlob("HAD-Starter-Kit.zip", blob);
}
