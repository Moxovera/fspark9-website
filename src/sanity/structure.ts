import type { StructureResolver } from "sanity/structure";

// Studio menüsü: siteyi gezme sırasıyla. Tekil sayfalar doğrudan açılıyor,
// hizmetler ve vakalar sıralarına, bölümler yayın sırasına göre.

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("fspark9")
    .items([
      singleton(S, "siteSettings", "Site settings"),
      S.divider(),
      singleton(S, "homePage", "Home"),
      S.listItem()
        .title("Services")
        .child(
          S.list()
            .title("Services")
            .items([
              singleton(S, "servicesPage", "Services page"),
              S.listItem()
                .title("The four services")
                .schemaType("servicePage")
                .child(S.documentTypeList("servicePage").title("The four services").defaultOrdering([{ field: "order", direction: "asc" }])),
            ]),
        ),
      S.listItem()
        .title("Work")
        .child(
          S.list()
            .title("Work")
            .items([
              singleton(S, "workPage", "Work page"),
              S.listItem()
                .title("Cases")
                .schemaType("caseStudy")
                .child(S.documentTypeList("caseStudy").title("Cases").defaultOrdering([{ field: "order", direction: "asc" }])),
            ]),
        ),
      singleton(S, "aboutPage", "About"),
      S.listItem()
        .title("Spark")
        .child(
          S.list()
            .title("Spark")
            .items([
              singleton(S, "sparkSection", "Spark hub and labels"),
              S.listItem()
                .title("Formats")
                .schemaType("sparkFormat")
                .child(S.documentTypeList("sparkFormat").title("Formats").defaultOrdering([{ field: "orderRank", direction: "asc" }])),
              S.listItem()
                .title("Episodes")
                .schemaType("sparkEpisode")
                .child(S.documentTypeList("sparkEpisode").title("Episodes").defaultOrdering([{ field: "number", direction: "asc" }])),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Legal pages")
        .schemaType("legalPage")
        .child(S.documentTypeList("legalPage").title("Legal pages")),
    ]);
