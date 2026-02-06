import { Suspense } from "react";
import ToolsClient from "./ToolsClient";
import { getToolsData } from "@/lib/tools-data";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export default async function ToolsPage() {
  const { tools, categories } = await getToolsData();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
        ]}
      />
      <Suspense>
        <ToolsClient tools={tools} categories={categories} />
      </Suspense>
    </>
  );
}
