import { notFound } from "next/navigation";
import ToolPageTemplate from "@/components/tools/ToolPageTemplate";
import ABTestingSignificanceCalculatorTool from "@/components/tools/ab-significance-calculator/ABTestingSignificanceCalculatorTool";
import DataLayerPushGeneratorTool from "@/components/tools/datalayer-push-generator/DataLayerPushGeneratorTool";
import KeywordConcatenationTool from "@/components/tools/keyword-concatenator/KeywordConcatenationTool";
import UTMBuilderTool from "@/components/tools/utm-builder/UTMBuilderTool";
import { getToolBySlug, getToolSlugs } from "@/lib/tools/toolRegistry";
import { generateMeta } from "@/lib/seo";

const toolComponents = {
  "ab-testing-significance-calculator": ABTestingSignificanceCalculatorTool,
  "datalayer-push-snippet-generator": DataLayerPushGeneratorTool,
  "ppc-keyword-concatenation-tool": KeywordConcatenationTool,
  "utm-builder": UTMBuilderTool,
};

export function generateStaticParams() {
  return getToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return generateMeta({
      title: "Tool not found | Ads That Convert",
      description: "The tool you are looking for could not be found.",
      path: `/tools/${slug}`,
    });
  }

  return generateMeta({
    title: `${tool.name} | Ads That Convert`,
    description: tool.description,
    path: `/tools/${slug}`,
  });
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = toolComponents[tool.slug];

  if (!ToolComponent) {
    notFound();
  }

  return (
    <ToolPageTemplate
      title={tool.title}
      description={tool.description}
      faqTitle={tool.faqTitle}
      faqItems={tool.faqItems}
    >
      <ToolComponent />
    </ToolPageTemplate>
  );
}
