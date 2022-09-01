/**
(c) Tecnologico de Monterrey 2022
Last updated: Wednesday August 31st.
*/

CREATE TABLE "User"(
    "id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "first_lastname" VARCHAR(255) NOT NULL,
    "second_lastname" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "cellphone" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE
    "User" ADD PRIMARY KEY("id");
CREATE TABLE "Role"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE
    "Role" ADD PRIMARY KEY("id");
CREATE TABLE "Evidence"(
    "id" INTEGER NOT NULL,
    "application_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "file" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE
    "Evidence" ADD PRIMARY KEY("id");
CREATE INDEX "evidence_application_id_index" ON
    "Evidence"("application_id");
CREATE TABLE "FAQ"(
    "id" INTEGER NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE
    "FAQ" ADD PRIMARY KEY("id");
CREATE TABLE "Application"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "deadline" DATE NOT NULL,
    "start_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "end_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "emission_date" DATE NOT NULL,
    "response_date" DATE NOT NULL,
    "application_status_id" INTEGER NOT NULL,
    "citation_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE
    "Application" ADD PRIMARY KEY("id");
CREATE TABLE "Document"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "file_type_id" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE
    "Document" ADD PRIMARY KEY("id");
CREATE TABLE "ApplicationStatus"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE
    "ApplicationStatus" ADD PRIMARY KEY("id");
CREATE TABLE "DocumentType"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE
    "DocumentType" ADD PRIMARY KEY("id");
CREATE TABLE "Citation"(
    "id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "document_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE
    "Citation" ADD PRIMARY KEY("id");
CREATE TABLE "Format"(
    "id" INTEGER NOT NULL,
    "citation_id" INTEGER NOT NULL,
    "document_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE
    "Format" ADD PRIMARY KEY("id");
CREATE TABLE "Label"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE
    "Label" ADD PRIMARY KEY("id");
CREATE TABLE "Application_Label"(
    "id" INTEGER NOT NULL,
    "application_id" INTEGER NOT NULL,
    "label_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE
    "Application_Label" ADD PRIMARY KEY("id");
ALTER TABLE
    "Application" ADD CONSTRAINT "application_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "User"("id");
ALTER TABLE
    "Document" ADD CONSTRAINT "document_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "User"("id");
ALTER TABLE
    "Document" ADD CONSTRAINT "document_file_type_id_foreign" FOREIGN KEY("file_type_id") REFERENCES "DocumentType"("id");
ALTER TABLE
    "Application" ADD CONSTRAINT "application_application_status_id_foreign" FOREIGN KEY("application_status_id") REFERENCES "ApplicationStatus"("id");
ALTER TABLE
    "Citation" ADD CONSTRAINT "citation_document_id_foreign" FOREIGN KEY("document_id") REFERENCES "Document"("id");
ALTER TABLE
    "Format" ADD CONSTRAINT "format_document_id_foreign" FOREIGN KEY("document_id") REFERENCES "Document"("id");
ALTER TABLE
    "Application_Label" ADD CONSTRAINT "application_label_label_id_foreign" FOREIGN KEY("label_id") REFERENCES "Label"("id");
ALTER TABLE
    "User" ADD CONSTRAINT "user_role_id_foreign" FOREIGN KEY("role_id") REFERENCES "Role"("id");
ALTER TABLE
    "Application_Label" ADD CONSTRAINT "application_label_application_id_foreign" FOREIGN KEY("application_id") REFERENCES "Application"("id");
ALTER TABLE
    "Application" ADD CONSTRAINT "application_citation_id_foreign" FOREIGN KEY("citation_id") REFERENCES "Citation"("id");
ALTER TABLE
    "Format" ADD CONSTRAINT "format_citation_id_foreign" FOREIGN KEY("citation_id") REFERENCES "Citation"("id");