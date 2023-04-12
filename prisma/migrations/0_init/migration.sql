-- CreateEnum
CREATE TYPE "Attachments_attachment_type_enum" AS ENUM ('DOC', 'IMAGE', 'VIDEO', 'AUDIO', 'OTHER');

-- CreateEnum
CREATE TYPE "Attachments_status_enum" AS ENUM ('INGESTED', 'PROCESSED', 'TRANSCODED', 'PUBLISHED', 'ERROR', 'UPLOADED', 'NEW');

-- CreateEnum
CREATE TYPE "Contacts_type_enum" AS ENUM ('Insured', 'Additional Insured', 'Family Member', 'Claimant', 'Agent', 'Mortgage', 'Lienholder', 'Public Adjuster', 'Power of Attorney', 'Attorney', 'TPA Representative', 'Umpire', 'Opposing Appraiser', 'Other');

-- CreateEnum
CREATE TYPE "Deliverables_type_enum" AS ENUM ('TaskForm', 'Upload');

-- CreateEnum
CREATE TYPE "Emails_type_enum" AS ENUM ('WORK', 'PERSONAL');

-- CreateEnum
CREATE TYPE "InspQuestions_answer_type_enum" AS ENUM ('SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'SINGLE_TEXT_LINE', 'MULTIPLE_TEXT_LINE');

-- CreateEnum
CREATE TYPE "Inspections_status_enum" AS ENUM ('Draft', 'Published');

-- CreateEnum
CREATE TYPE "Inspections_version_enum" AS ENUM ('Preliminary', 'Interim', 'Final', 'Supplemental');

-- CreateEnum
CREATE TYPE "Phones_type_enum" AS ENUM ('WORK', 'PERSONAL', 'HOME');

-- CreateEnum
CREATE TYPE "Users_role_enum" AS ENUM ('SUPER-USER', 'ADMINISTRATOR', 'MANAGER', 'SUPERVISOR', 'EXAMINER', 'INSPECTOR', 'ADJUSTER', 'TRAINER', 'VOUCHER-USER');

-- CreateEnum
CREATE TYPE "Users_speciality_enum" AS ENUM ('Painters', 'Fencers', 'Landscapers', 'General Contractor', 'Roofer', 'Ladder Assist', 'Electrician', 'HVAC', 'Plumber', 'Temp Repair', 'Board Up Company', 'Water Mitigation', 'Content Restoration', 'Dry Cleaners', 'Cause and Origin', 'Leak Detection', 'Engineer', 'Electronics Technician', 'Attorney', 'DAT (Data Acquisition Technician)', 'DAP (Data Acquisition Pro)', 'DTI (Data Thermal Imaging)', 'ADS (Aerial Data Specialist - Drone)');

-- CreateEnum
CREATE TYPE "VoiceCalls_merge_status_enum" AS ENUM ('QUEUED', 'HOLD', 'IN_PROGRESS', 'RECORDING', 'COMPLETED', 'NOT_PROCESSED');

-- CreateEnum
CREATE TYPE "VoiceCalls_recording_type_enum" AS ENUM ('CALL', 'VOICEMAIL');

-- CreateEnum
CREATE TYPE "enum_Activities_activity_type" AS ENUM ('NOTE', 'ATTACHMENT', 'STATUS_UPDATE', 'CLAIM_UPDATED', 'CHECK_IN', 'CHECK_OUT', 'RECEIVED', 'CLOSED', 'ERROR', 'ASSIGNED_TO', 'COMMUNICATED', 'COVERAGE_A_UPDATE', 'COVERAGE_B_UPDATE', 'COVERAGE_C_UPDATE', 'COVERAGE_D_UPDATE', 'COVERAGE_E_UPDATE', 'COVERAGE_F_UPDATE', 'PHONE_CALL', 'CLAIM_STATUS_UPDATED');

-- CreateEnum
CREATE TYPE "enum_Addresses_type" AS ENUM ('WORK', 'HOME');

-- CreateEnum
CREATE TYPE "enum_UserNotifications_status" AS ENUM ('NEW', 'SEEN', 'OPENED');

-- CreateTable
CREATE TABLE "AreaMedias" (
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "area_id" INTEGER NOT NULL,
    "attachment_id" INTEGER NOT NULL,

    CONSTRAINT "AreaMedias_pkey" PRIMARY KEY ("area_id","attachment_id")
);

-- CreateTable
CREATE TABLE "AreaRegInformations" (
    "answer" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "area_id" INTEGER NOT NULL,
    "insp_question_id" INTEGER NOT NULL,

    CONSTRAINT "AreaRegInformations_pkey" PRIMARY KEY ("area_id","insp_question_id")
);

-- CreateTable
CREATE TABLE "Areas" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "has_damage" BOOLEAN NOT NULL DEFAULT false,
    "measurements" JSON[],
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "inspection_id" INTEGER,
    "subject_category_pair_id" INTEGER,

    CONSTRAINT "Areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentStatuses" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "caption" VARCHAR(255) NOT NULL,
    "percentage_of_effort" DECIMAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "AssignmentStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentTeamMembers" (
    "id" SERIAL NOT NULL,
    "meta" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "assignment_id" INTEGER,
    "contact_id" INTEGER,

    CONSTRAINT "AssignmentTeamMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentTypeModifiers" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "AssignmentTypeModifiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentTypes" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "AssignmentTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignments" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "process_flow" JSONB,
    "meta" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "case_id" INTEGER,
    "type_id" INTEGER,
    "type_modifier_id" INTEGER,
    "status_id" INTEGER,
    "assigner_organization_id" INTEGER,
    "assigned_organization_id" INTEGER,

    CONSTRAINT "Assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachments" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "filename" VARCHAR(255) NOT NULL,
    "status" "Attachments_status_enum" NOT NULL,
    "attachment_type" "Attachments_attachment_type_enum" NOT NULL,
    "url" VARCHAR(255),
    "thumbnail" VARCHAR(255),
    "build_guid" VARCHAR(255),
    "meta" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "claim_id" INTEGER,
    "area_id" INTEGER,
    "voucher_id" INTEGER,

    CONSTRAINT "Attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessContacts" (
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "business_id" INTEGER NOT NULL,
    "contact_id" INTEGER NOT NULL,

    CONSTRAINT "BusinessContacts_pkey" PRIMARY KEY ("business_id","contact_id")
);

-- CreateTable
CREATE TABLE "Businesses" (
    "id" SERIAL NOT NULL,
    "tags" JSONB,
    "meta" JSONB,
    "name" VARCHAR(255) NOT NULL,
    "legal_name" VARCHAR(255) NOT NULL,
    "alternative_name" VARCHAR(255),
    "sites" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "contact_id" INTEGER,

    CONSTRAINT "Businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarrierAssignmentTypeModifiers" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "seq" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "carrier_assignment_type_id" INTEGER,
    "type_modifier_entity_id" INTEGER,

    CONSTRAINT "CarrierAssignmentTypeModifiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarrierAssignmentTypes" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "seq" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "carrier_case_type_id" INTEGER,
    "type_entity_id" INTEGER,

    CONSTRAINT "CarrierAssignmentTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarrierCaseTypes" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "seq" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "carrier_id" INTEGER,
    "type_entity_id" INTEGER,

    CONSTRAINT "CarrierCaseTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarrierLineOfBusiness" (
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "carrier_id" INTEGER NOT NULL,
    "line_of_business_id" INTEGER NOT NULL,

    CONSTRAINT "CarrierLineOfBusiness_pkey" PRIMARY KEY ("carrier_id","line_of_business_id")
);

-- CreateTable
CREATE TABLE "CarrierProcessFlowScenarios" (
    "id" SERIAL NOT NULL,
    "effective_at" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "active" BOOLEAN NOT NULL,
    "caption" VARCHAR(255),
    "description" TEXT NOT NULL,
    "meta" JSONB,
    "event" JSONB,
    "conditions" JSONB,
    "carrier_flow_id" INTEGER,
    "carrier_lob_id" INTEGER,
    "carrier_case_type_id" INTEGER,
    "carrier_assignment_type_id" INTEGER,
    "carrier_assignment_type_modifier_id" INTEGER,

    CONSTRAINT "CarrierProcessFlowScenarios_pkey_1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarrierProcessFlows" (
    "id" SERIAL NOT NULL,
    "effective_at" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "active" BOOLEAN NOT NULL,
    "flow_id" INTEGER,
    "carrier_id" INTEGER,
    "facts" JSONB,
    "meta" JSONB,

    CONSTRAINT "CarrierProcessFlows_pkey_1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarrierVendorPreferences" (
    "preference_level" INTEGER NOT NULL DEFAULT 0,
    "for_specialities" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "carrier_id" INTEGER NOT NULL,
    "vendor_id" INTEGER NOT NULL,

    CONSTRAINT "CarrierVendorPreferences_pkey" PRIMARY KEY ("carrier_id","vendor_id")
);

-- CreateTable
CREATE TABLE "Carriers" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "status" INTEGER NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "short_name" VARCHAR(255),
    "legal_name" VARCHAR(255) NOT NULL,
    "web_url" VARCHAR(255),
    "meta" JSONB,
    "logo" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "contact_id" INTEGER,

    CONSTRAINT "Carriers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseTypes" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "CaseTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cases" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "carrier_id" INTEGER,
    "carrier_case_type_id" INTEGER,
    "predecesor_case_id" INTEGER,

    CONSTRAINT "Cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimContacts" (
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "claim_id" INTEGER NOT NULL,
    "contact_id" INTEGER NOT NULL,

    CONSTRAINT "ClaimContacts_pkey" PRIMARY KEY ("claim_id","contact_id")
);

-- CreateTable
CREATE TABLE "ClaimLossTypeModifiers" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "ClaimLossTypeModifiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimLossTypePairs" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "type_id" INTEGER,
    "modifier_id" INTEGER,

    CONSTRAINT "ClaimLossTypePairs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimLossTypes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "ClaimLossTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimStatuses" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "caption" VARCHAR(255) NOT NULL,
    "percentage_of_effort" DECIMAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "ClaimStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Claims" (
    "id" SERIAL NOT NULL,
    "carrier_claim_number" VARCHAR(255) NOT NULL,
    "loss_description" TEXT NOT NULL,
    "loss_date" TIMESTAMPTZ(6) NOT NULL,
    "meta" JSONB,
    "active" BOOLEAN NOT NULL,
    "catastrophe_code" VARCHAR(255),
    "policy_number" VARCHAR(255) NOT NULL,
    "policy_effective_date" TIMESTAMPTZ(6),
    "estimated_effort" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "carrier_id" INTEGER,
    "incident_id" INTEGER,
    "property_id" INTEGER,
    "claim_status_id" INTEGER,
    "adjuster_id" INTEGER,
    "line_of_business_id" INTEGER,
    "policy_data" JSONB,
    "loss_type_pair_id" INTEGER,
    "independent_adjuster_id" INTEGER,
    "policy_type_id" INTEGER,
    "deductible_code_id" INTEGER,
    "reserve" JSONB,
    "case_id" INTEGER,

    CONSTRAINT "Claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255),
    "insured" BOOLEAN DEFAULT false,
    "primary" BOOLEAN DEFAULT false,
    "contact_points" JSONB,
    "meta" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "full_name" VARCHAR(255),
    "user_id" INTEGER,
    "type" "Contacts_type_enum" NOT NULL DEFAULT 'Other',

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConversationContacts" (
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "contact_id" INTEGER NOT NULL,

    CONSTRAINT "ConversationContacts_pkey" PRIMARY KEY ("conversation_id","contact_id")
);

-- CreateTable
CREATE TABLE "Conversations" (
    "id" SERIAL NOT NULL,
    "phone_number" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "claim_id" INTEGER,
    "is_external" BOOLEAN DEFAULT false,
    "owner_contact_id" INTEGER,

    CONSTRAINT "Conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeductibleCodes" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "caption" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "line_of_business_id" INTEGER,

    CONSTRAINT "DeductibleCodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deliverables" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL,
    "type" "Deliverables_type_enum" NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "caption" VARCHAR(255) NOT NULL,
    "effective_at" TIMESTAMPTZ(6) NOT NULL,
    "render_def" JSONB,
    "data_def" JSONB,
    "resolution_def" JSONB,
    "meta" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "Deliverables_pkey1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emails" (
    "id" SERIAL NOT NULL,
    "caption" VARCHAR(255),
    "type" "Emails_type_enum" NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "primary" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "contact_id" INTEGER,

    CONSTRAINT "Emails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FnolRuns" (
    "id" SERIAL NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "info" JSONB,
    "annotations" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "FnolRuns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imports" (
    "id" SERIAL NOT NULL,
    "carrier_claim_number" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "status" VARCHAR(255),
    "last_msg" VARCHAR(255),
    "txs" VARCHAR(255),
    "original_data" JSONB,
    "cached_data" JSONB,
    "claim_id" INTEGER,
    "carrier_id" INTEGER,
    "history" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "Imports_pkey" PRIMARY KEY ("id","carrier_claim_number")
);

-- CreateTable
CREATE TABLE "Incidents" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "status" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "Incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspQuestionGroups" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "InspQuestionGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspQuestions" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "question" VARCHAR(255) NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "answer_type" "InspQuestions_answer_type_enum" NOT NULL,
    "answer_options" JSONB,
    "default_answer" JSONB,
    "answer_assertion" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "question_group_id" INTEGER,

    CONSTRAINT "InspQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspQuestionsLookups" (
    "id" SERIAL NOT NULL,
    "by_catastrophe_flag" BOOLEAN,
    "is_optional" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "insp_question_group_id" INTEGER,
    "by_carrier_ref" INTEGER,
    "by_line_of_business_ref" INTEGER,
    "by_claim_loss_type_ref" INTEGER,
    "by_claim_loss_modifier_ref" INTEGER,
    "by_insp_subject_ref" INTEGER,
    "by_insp_sub_category_ref" INTEGER,

    CONSTRAINT "InspQuestionsLookups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspSubjCategPairs" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "subject_id" INTEGER,
    "sub_category_id" INTEGER,

    CONSTRAINT "InspSubjCategPairs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspSubjCategories" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "InspSubjCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspSubjects" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "may_have_measurements" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "InspSubjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectionTypes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "InspectionTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspections" (
    "id" SERIAL NOT NULL,
    "version" "Inspections_version_enum" NOT NULL,
    "status" "Inspections_status_enum" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "claim_id" INTEGER,
    "type_id" INTEGER,
    "author_user_id" INTEGER,

    CONSTRAINT "Inspections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Languages" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "caption" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineOfBusinesses" (
    "id" SERIAL NOT NULL,
    "caption" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "LineOfBusinesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LobCoverages" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "limit_name" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "line_of_business_id" INTEGER,

    CONSTRAINT "LobCoverages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "sid" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "bulk_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "conversation_id" INTEGER,
    "owner_contact_id" INTEGER,
    "meta" JSONB,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "sticky" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "claim_id" INTEGER,
    "voice_call_id" INTEGER,
    "meta" JSONB,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "operation_path" VARCHAR(255) NOT NULL,
    "allowed_roles" JSONB,
    "context" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionsContexts" (
    "id" SERIAL NOT NULL,
    "context" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "conditions" VARCHAR[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],

    CONSTRAINT "PermissionsContexts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phones" (
    "id" SERIAL NOT NULL,
    "type" "Phones_type_enum",
    "sms_capable" BOOLEAN NOT NULL DEFAULT false,
    "country_code" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "ext" INTEGER,
    "vanity_number" VARCHAR(255),
    "caption" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "contact_id" INTEGER,
    "meta" JSONB,

    CONSTRAINT "Phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolicyTypes" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "caption" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "reserve_template" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "line_of_business_id" INTEGER,

    CONSTRAINT "PolicyTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessFlows" (
    "id" SERIAL NOT NULL,
    "caption" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "ProcessFlows_pkey_1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255),
    "description" VARCHAR(255),
    "meta" JSONB,
    "contact_points" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "address_id" INTEGER,
    "phone_id" INTEGER,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SequelizeMeta" (
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "caption" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialities" (
    "id" SERIAL NOT NULL,
    "caption" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "Specialities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stages" (
    "id" SERIAL NOT NULL,
    "catastrophic" BOOLEAN,
    "caption" VARCHAR(255) NOT NULL,
    "seq" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "carrier_id" INTEGER,
    "line_of_business_id" INTEGER,
    "loss_type_pair_id" INTEGER,
    "percentage_of_effort" DECIMAL DEFAULT 0,

    CONSTRAINT "Stages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectDefs" (
    "id" SERIAL NOT NULL,
    "def" JSONB,
    "meta" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "SubjectDefs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemReports" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "meta" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "SystemReports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TMP_layout_s" (
    "id" SERIAL NOT NULL,
    "merge_id" INTEGER,
    "group_id" INTEGER,
    "meta" JSONB,

    CONSTRAINT "TMP_layout_s_pkey_1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TMP_layout_st" (
    "id" SERIAL NOT NULL,
    "merge_id" INTEGER,
    "group_id" INTEGER,
    "meta" JSONB,

    CONSTRAINT "TMP_layout_st_pkey_1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TMP_stages" (
    "id" SERIAL NOT NULL,
    "merge_id" INTEGER,
    "group_id" INTEGER,
    "meta" JSONB,

    CONSTRAINT "TMP_stages_pkey_1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TMP_tasks" (
    "id" SERIAL NOT NULL,
    "merge_id" INTEGER,
    "group_id" INTEGER,
    "meta" JSONB,

    CONSTRAINT "TMP_tasks_pkey_1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskActions" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "TaskActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskDeliverables" (
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deliverable_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "TaskDeliverables_pkey" PRIMARY KEY ("deliverable_id","task_id")
);

-- CreateTable
CREATE TABLE "TaskStatusTransitions" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "meta" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "initial_status_id" INTEGER,
    "on_action_id" INTEGER,
    "next_status_id" INTEGER,
    "seq" INTEGER DEFAULT 0,

    CONSTRAINT "TaskStatusTransitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskStatuses" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "TaskStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "caption" VARCHAR(255) NOT NULL,
    "assignable" BOOLEAN NOT NULL,
    "seq" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "stage_id" INTEGER,
    "hasWorkflow" VARCHAR(255),
    "type" VARCHAR[],
    "percentage_of_effort" DECIMAL DEFAULT 0,
    "coverage" VARCHAR[],

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCarriers" (
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "carrier_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserCarriers_pkey" PRIMARY KEY ("carrier_id","user_id")
);

-- CreateTable
CREATE TABLE "UserFcmTokens" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "token_info" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "user_id" INTEGER,

    CONSTRAINT "UserFcmTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLanguages" (
    "primary" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,

    CONSTRAINT "UserLanguages_pkey" PRIMARY KEY ("user_id","language_id")
);

-- CreateTable
CREATE TABLE "UserServiceAreas" (
    "for_specialities" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,

    CONSTRAINT "UserServiceAreas_pkey" PRIMARY KEY ("user_id","address_id")
);

-- CreateTable
CREATE TABLE "UserSpecialityServices" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "service_id" INTEGER,
    "speciality_id" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "UserSpecialityServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVendors" (
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "vendor_id" INTEGER NOT NULL,

    CONSTRAINT "UserVendors_pkey" PRIMARY KEY ("user_id","vendor_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(255),
    "username" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "role" "Users_role_enum" NOT NULL,
    "speciality" "Users_speciality_enum",
    "avatar" VARCHAR(255),
    "activation_code" UUID,
    "is_tc" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "status" VARCHAR NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorCarrier" (
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "carrier_id" INTEGER NOT NULL,
    "vendor_id" INTEGER NOT NULL,

    CONSTRAINT "VendorCarrier_pkey" PRIMARY KEY ("carrier_id","vendor_id")
);

-- CreateTable
CREATE TABLE "VendorServiceAreas" (
    "for_specialities" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,

    CONSTRAINT "VendorServiceAreas_pkey" PRIMARY KEY ("vendor_id","address_id")
);

-- CreateTable
CREATE TABLE "VendorSpecialty" (
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "speciality_id" INTEGER NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "costs" JSONB,
    "meta" JSONB,

    CONSTRAINT "VendorSpecialty_pkey" PRIMARY KEY ("speciality_id","vendor_id")
);

-- CreateTable
CREATE TABLE "VendorUserPreferences" (
    "preference_level" INTEGER NOT NULL DEFAULT 0,
    "for_specialities" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "vendor_id" INTEGER NOT NULL,

    CONSTRAINT "VendorUserPreferences_pkey" PRIMARY KEY ("user_id","vendor_id")
);

-- CreateTable
CREATE TABLE "Vendors" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "name" VARCHAR(255),
    "legal_name" VARCHAR(255) NOT NULL,
    "web_url" VARCHAR(255),
    "meta" JSONB,
    "logo" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "contact_id" INTEGER,

    CONSTRAINT "Vendors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoRooms" (
    "id" SERIAL NOT NULL,
    "sid" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "duration" INTEGER,
    "end_time" TIMESTAMPTZ(6),
    "composition_sid" VARCHAR(255),
    "composition_url" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "conversation_id" INTEGER,
    "owner_contact_id" INTEGER,

    CONSTRAINT "VideoRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoiceCalls" (
    "id" SERIAL NOT NULL,
    "sid" VARCHAR(255) NOT NULL,
    "from" VARCHAR(255) NOT NULL,
    "to" VARCHAR(255) NOT NULL,
    "direction" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "duration" INTEGER,
    "merge_status" "VoiceCalls_merge_status_enum" NOT NULL,
    "status_updated_at" TIMESTAMPTZ(6) NOT NULL,
    "recording_type" "VoiceCalls_recording_type_enum",
    "recording_url" VARCHAR(255),
    "recording_sid" VARCHAR(255),
    "recording_duration" INTEGER,
    "api_version" VARCHAR(255),
    "caller_name" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "conversation_id" INTEGER,
    "attendant_contact_id" INTEGER,
    "meta" JSONB,

    CONSTRAINT "VoiceCalls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoucherTypes" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "caption" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "order" INTEGER NOT NULL DEFAULT 0,
    "order_attributes" JSONB,
    "redemption_attributes" JSONB,
    "meta" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "proc_statuses" VARCHAR[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],

    CONSTRAINT "VoucherTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vouchers" (
    "id" SERIAL NOT NULL,
    "redemption_code" VARCHAR(255) NOT NULL,
    "cycle_status" VARCHAR(255) NOT NULL,
    "cycle_dates" JSONB,
    "claim_info" JSONB,
    "order_info" JSONB,
    "redemption_info" JSONB,
    "activities" JSONB,
    "meta" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "type_id" INTEGER,
    "claim_id" INTEGER,

    CONSTRAINT "Vouchers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowPublications" (
    "id" SERIAL NOT NULL,
    "data" JSONB,
    "meta" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "task_work_id" INTEGER,

    CONSTRAINT "WorkflowPublications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Works" (
    "id" SERIAL NOT NULL,
    "checked" BOOLEAN,
    "note" TEXT,
    "active" BOOLEAN,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "claim_id" INTEGER,
    "task_id" INTEGER,
    "assignment_user_id" INTEGER,
    "status_id" INTEGER,
    "scheduled_date" TIMESTAMPTZ(6),
    "last_known_location" JSONB,
    "meta" JSONB,
    "assignment_workflow_pub_id" INTEGER,
    "assignment_id" INTEGER,
    "team_member_id" INTEGER,

    CONSTRAINT "Works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "all_open_claims" (
    "loc_id" VARCHAR(50),
    "desk_adjuster" VARCHAR(255),
    "inspector" VARCHAR(255),
    "insured" VARCHAR(255),
    "insured_phone" VARCHAR(50),
    "carrier_claim_number" VARCHAR(50),
    "policy_number" VARCHAR(50),
    "risk_address_1" VARCHAR(255),
    "risk_city" VARCHAR(255),
    "risk_zip" VARCHAR(50),
    "ni_contacted" VARCHAR(50),
    "ni_contact_next_action" VARCHAR(50),
    "ni_contacted_date" VARCHAR(50),
    "inspection_scheduled" VARCHAR(50),
    "inspection_scheduled_next_action" VARCHAR(50),
    "inspection_scheduled_date" VARCHAR(50),
    "inspection_uploaded" VARCHAR(50),
    "inspection_notes" TEXT,
    "ni_contacted_note" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "all_open_claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coffee" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "brand" VARCHAR NOT NULL,
    "recommendations" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PK_4d27239ee0b99a491ad806aec46" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coffee_flavors_flavor" (
    "coffeeId" INTEGER NOT NULL,
    "flavorId" INTEGER NOT NULL,

    CONSTRAINT "PK_64cde86968c8b440e3c63626e80" PRIMARY KEY ("coffeeId","flavorId")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "payload" JSON NOT NULL,

    CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flavor" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_934fe79b3d8131395c29a040ee5" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flavor_index" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_81d8b9cc2c1979df62ca05b36f9" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AreaMedias_pkey_index" ON "AreaMedias"("area_id", "attachment_id");

-- CreateIndex
CREATE UNIQUE INDEX "AreaRegInformations_pkey_index" ON "AreaRegInformations"("area_id", "insp_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "Areas_pkey_index" ON "Areas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentStatuses_pkey_index" ON "AssignmentStatuses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentTeamMembers_pkey_index" ON "AssignmentTeamMembers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentTypeModifiers_pkey_index" ON "AssignmentTypeModifiers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentTypeModifiers_code_key" ON "AssignmentTypeModifiers"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentTypeModifiers_name_key" ON "AssignmentTypeModifiers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentTypes_pkey_index" ON "AssignmentTypes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentTypes_code_key" ON "AssignmentTypes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentTypes_name_key" ON "AssignmentTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Assignments_pkey_index" ON "Assignments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Attachments_pkey_index" ON "Attachments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessContacts_pkey_index" ON "BusinessContacts"("business_id", "contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "Businesses_pkey_index" ON "Businesses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CarrierAssignmentTypeModifiers_pkey_index" ON "CarrierAssignmentTypeModifiers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CarrierAssignmentTypeModifiers_unique_pair_index" ON "CarrierAssignmentTypeModifiers"("carrier_assignment_type_id", "type_modifier_entity_id");

-- CreateIndex
CREATE UNIQUE INDEX "CarrierAssignmentTypes_pkey_index" ON "CarrierAssignmentTypes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CarrierAssignmentTypes_unique_pair_index" ON "CarrierAssignmentTypes"("carrier_case_type_id", "type_entity_id");

-- CreateIndex
CREATE UNIQUE INDEX "CarrierCaseTypes_pkey_index" ON "CarrierCaseTypes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CarrierCaseTypes_unique_pair_index" ON "CarrierCaseTypes"("carrier_id", "type_entity_id");

-- CreateIndex
CREATE UNIQUE INDEX "CarrierLineOfBusiness_pkey_index" ON "CarrierLineOfBusiness"("carrier_id", "line_of_business_id");

-- CreateIndex
CREATE UNIQUE INDEX "CarrierProcessFlowScenarios_pkey_1_index" ON "CarrierProcessFlowScenarios"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CarrierProcessFlows_pkey_1_index" ON "CarrierProcessFlows"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CarrierVendorPreferences_pkey_index" ON "CarrierVendorPreferences"("carrier_id", "vendor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Carriers_pkey_index" ON "Carriers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CaseTypes_pkey_index" ON "CaseTypes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CaseTypes_code_key" ON "CaseTypes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CaseTypes_name_key" ON "CaseTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cases_pkey_index" ON "Cases"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimContacts_contact_id_index" ON "ClaimContacts"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimContacts_pkey_index" ON "ClaimContacts"("claim_id", "contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimLossTypeModifiers_pkey_index" ON "ClaimLossTypeModifiers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimLossTypeModifiers_title_key" ON "ClaimLossTypeModifiers"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimLossTypePairs_pkey_index" ON "ClaimLossTypePairs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimLossTypePairs_unique_pair_index" ON "ClaimLossTypePairs"("modifier_id", "type_id");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimLossTypes_pkey_index" ON "ClaimLossTypes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimLossTypes_title_key" ON "ClaimLossTypes"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimStatuses_pkey_index" ON "ClaimStatuses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Claims_pkey_index" ON "Claims"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Contacts_pkey_index" ON "Contacts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ConversationContacts_pkey_index" ON "ConversationContacts"("contact_id", "conversation_id");

-- CreateIndex
CREATE UNIQUE INDEX "Conversations_pkey_index" ON "Conversations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeductibleCodes_pkey_index" ON "DeductibleCodes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Deliverables_pkey1_index" ON "Deliverables"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Emails_pkey_index" ON "Emails"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FnolRuns_pkey_index" ON "FnolRuns"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Imports_carrier_claim_number_key_index" ON "Imports"("carrier_claim_number");

-- CreateIndex
CREATE UNIQUE INDEX "Imports_pkey_index" ON "Imports"("carrier_claim_number", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Incidents_pkey_index" ON "Incidents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InspQuestionGroups_pkey_index" ON "InspQuestionGroups"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InspQuestions_pkey_index" ON "InspQuestions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InspQuestionsLookups_pkey_index" ON "InspQuestionsLookups"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InspQuestionsLookups_unique_refers_index" ON "InspQuestionsLookups"("by_carrier_ref", "by_catastrophe_flag", "by_claim_loss_modifier_ref", "by_claim_loss_type_ref", "by_insp_sub_category_ref", "by_insp_subject_ref", "by_line_of_business_ref", "insp_question_group_id");

-- CreateIndex
CREATE UNIQUE INDEX "InspSubjCategPairs_pkey_index" ON "InspSubjCategPairs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InspSubjCategPairs_unique_pair_index" ON "InspSubjCategPairs"("sub_category_id", "subject_id");

-- CreateIndex
CREATE UNIQUE INDEX "InspSubjCategories_pkey_index" ON "InspSubjCategories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InspSubjCategories_title_key" ON "InspSubjCategories"("title");

-- CreateIndex
CREATE UNIQUE INDEX "InspSubjects_pkey_index" ON "InspSubjects"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InspSubjects_title_key" ON "InspSubjects"("title");

-- CreateIndex
CREATE UNIQUE INDEX "InspectionTypes_pkey_index_index" ON "InspectionTypes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InspectionTypes_title_key" ON "InspectionTypes"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Inspections_pkey_index_index" ON "Inspections"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Languages_pkey_index" ON "Languages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LineOfBusinesses_pkey_index" ON "LineOfBusinesses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LobCoverages_pkey_index" ON "LobCoverages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Messages_pkey_index" ON "Messages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Notes_pkey_index" ON "Notes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_pkey_index" ON "Permissions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionsContexts_pkey_index" ON "PermissionsContexts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Phones_pkey_index" ON "Phones"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PolicyTypes_pkey_index" ON "PolicyTypes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PolicyTypes_caption_key" ON "PolicyTypes"("caption");

-- CreateIndex
CREATE UNIQUE INDEX "ProcessFlows_pkey_1_index" ON "ProcessFlows"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Properties_pkey_index" ON "Properties"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SequelizeMeta_pkey_index" ON "SequelizeMeta"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Services_pkey_index" ON "Services"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Specialities_pkey_index" ON "Specialities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stages_pkey_index" ON "Stages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectDefs_pkey_index" ON "SubjectDefs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SystemReports_pkey_index" ON "SystemReports"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TMP_layout_s_pkey_1_index" ON "TMP_layout_s"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TMP_layout_st_pkey_1_index" ON "TMP_layout_st"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TMP_stages_pkey_1_index" ON "TMP_stages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TMP_tasks_pkey_1_index" ON "TMP_tasks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TaskActions_pkey_index" ON "TaskActions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TaskDeliverables_pkey_index" ON "TaskDeliverables"("deliverable_id", "task_id");

-- CreateIndex
CREATE UNIQUE INDEX "TaskStatusTransitions_pkey_index" ON "TaskStatusTransitions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TaskStatuses_pkey_index" ON "TaskStatuses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_pkey_index" ON "Tasks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserCarriers_pkey_index_index" ON "UserCarriers"("carrier_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserFcmTokens_pkey_index_index" ON "UserFcmTokens"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserLanguages_pkey_index" ON "UserLanguages"("language_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserServiceAreas_pkey_index" ON "UserServiceAreas"("address_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSpecialityServices_pkey_index" ON "UserSpecialityServices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserVendors_pkey_index" ON "UserVendors"("user_id", "vendor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_pkey_index" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VendorCarrier_pkey_index" ON "VendorCarrier"("carrier_id", "vendor_id");

-- CreateIndex
CREATE UNIQUE INDEX "VendorServiceAreas_pkey_index" ON "VendorServiceAreas"("address_id", "vendor_id");

-- CreateIndex
CREATE UNIQUE INDEX "VendorSpecialty_pkey_index" ON "VendorSpecialty"("speciality_id", "vendor_id");

-- CreateIndex
CREATE UNIQUE INDEX "VendorUserPreferences_pkey_index" ON "VendorUserPreferences"("user_id", "vendor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Vendors_pkey_index" ON "Vendors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VideoRooms_pkey_index" ON "VideoRooms"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VoiceCalls_pkey_index" ON "VoiceCalls"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VoiceCalls_sid_key" ON "VoiceCalls"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "VoucherTypes_pkey_index" ON "VoucherTypes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VoucherTypes_caption_key" ON "VoucherTypes"("caption");

-- CreateIndex
CREATE UNIQUE INDEX "Vouchers_pkey_index" ON "Vouchers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowPublications_pkey_index" ON "WorkflowPublications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Works_pkey_index" ON "Works"("id");

-- CreateIndex
CREATE UNIQUE INDEX "all_open_claims_pkey_index" ON "all_open_claims"("id");

-- CreateIndex
CREATE INDEX "IDX_25642975c6f620d570c635f418" ON "coffee_flavors_flavor"("flavorId");

-- CreateIndex
CREATE INDEX "IDX_9cb98a3799afc95cf71fdb1c4f" ON "coffee_flavors_flavor"("coffeeId");

-- CreateIndex
CREATE INDEX "IDX_b535fbe8ec6d832dde22065ebd" ON "event"("name");

-- AddForeignKey
ALTER TABLE "AreaMedias" ADD CONSTRAINT "FK_70e78917082e2769b314b04a2b9" FOREIGN KEY ("attachment_id") REFERENCES "Attachments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaMedias" ADD CONSTRAINT "FK_a79bddef1eabc19d7d9c0756419" FOREIGN KEY ("area_id") REFERENCES "Areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaRegInformations" ADD CONSTRAINT "FK_1971f1d6e0912edadf5a358b937" FOREIGN KEY ("area_id") REFERENCES "Areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaRegInformations" ADD CONSTRAINT "FK_39a3cd9a4c9ee25050b1d9d1158" FOREIGN KEY ("insp_question_id") REFERENCES "InspQuestions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Areas" ADD CONSTRAINT "FK_2c679b4d7d768a28b3b34b5ee01" FOREIGN KEY ("inspection_id") REFERENCES "Inspections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Areas" ADD CONSTRAINT "FK_6ab00340a37619155be3dbae801" FOREIGN KEY ("subject_category_pair_id") REFERENCES "InspSubjCategPairs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentTeamMembers" ADD CONSTRAINT "FK_c5c108fceee6f3f7b2f4cd0f5f4" FOREIGN KEY ("assignment_id") REFERENCES "Assignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentTeamMembers" ADD CONSTRAINT "FK_d22564c655611f8f4ddbb374fff" FOREIGN KEY ("contact_id") REFERENCES "Contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "FK_3b1e6fe10cc31a5ae326c08d6d7" FOREIGN KEY ("assigned_organization_id") REFERENCES "Contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "FK_545c3855e3b3a209fbc331f8658" FOREIGN KEY ("assigner_organization_id") REFERENCES "Contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "FK_a020199a41e7b61330b948b6850" FOREIGN KEY ("case_id") REFERENCES "Cases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "FK_bcca518ecae644923bca783e636" FOREIGN KEY ("type_modifier_id") REFERENCES "CarrierAssignmentTypeModifiers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "FK_db68f3b4b03401179c9e3811e5b" FOREIGN KEY ("type_id") REFERENCES "CarrierAssignmentTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "FK_f72ce4a16ffb780eed0ee120ee1" FOREIGN KEY ("status_id") REFERENCES "AssignmentStatuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachments" ADD CONSTRAINT "FK_4f4a5807f6bdf31d1cb0d7474e9" FOREIGN KEY ("claim_id") REFERENCES "Claims"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachments" ADD CONSTRAINT "FK_f8c064201a1b7b76a917110db74" FOREIGN KEY ("voucher_id") REFERENCES "Vouchers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessContacts" ADD CONSTRAINT "FK_58c706238e7007d0a5d4562869a" FOREIGN KEY ("business_id") REFERENCES "Businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessContacts" ADD CONSTRAINT "FK_9b265caa8fb1ba11abf3575045a" FOREIGN KEY ("contact_id") REFERENCES "Contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Businesses" ADD CONSTRAINT "FK_ccaff15ac29f40be2a72562fae3" FOREIGN KEY ("contact_id") REFERENCES "Contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierAssignmentTypeModifiers" ADD CONSTRAINT "FK_19b860fbd3dd41ecca163393968" FOREIGN KEY ("carrier_assignment_type_id") REFERENCES "CarrierAssignmentTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierAssignmentTypeModifiers" ADD CONSTRAINT "FK_d12fd261c990e8f212ea041efd4" FOREIGN KEY ("type_modifier_entity_id") REFERENCES "AssignmentTypeModifiers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierAssignmentTypes" ADD CONSTRAINT "FK_59a07b954fbd1a30d6604c6e19e" FOREIGN KEY ("carrier_case_type_id") REFERENCES "CarrierCaseTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierAssignmentTypes" ADD CONSTRAINT "FK_f20c6c576c59d32b1b81cbe3e8d" FOREIGN KEY ("type_entity_id") REFERENCES "AssignmentTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierCaseTypes" ADD CONSTRAINT "FK_7232bf9837d20267b90724fb9f2" FOREIGN KEY ("type_entity_id") REFERENCES "CaseTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierCaseTypes" ADD CONSTRAINT "FK_d0f7f9952d11e55e53ade45f326" FOREIGN KEY ("carrier_id") REFERENCES "Carriers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierLineOfBusiness" ADD CONSTRAINT "FK_0a1259e0aa7de54eb282472148d" FOREIGN KEY ("carrier_id") REFERENCES "Carriers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierLineOfBusiness" ADD CONSTRAINT "FK_d5a747b5df59e9631ef78b5592c" FOREIGN KEY ("line_of_business_id") REFERENCES "LineOfBusinesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierProcessFlowScenarios" ADD CONSTRAINT "FK_08f2ef6aae6c073eeaabb6c5d8b" FOREIGN KEY ("carrier_flow_id") REFERENCES "CarrierProcessFlows"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierProcessFlowScenarios" ADD CONSTRAINT "FK_30324a37d47557e3809f95402b4" FOREIGN KEY ("carrier_assignment_type_id") REFERENCES "CarrierAssignmentTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierProcessFlowScenarios" ADD CONSTRAINT "FK_4907f76a8a08ba9c60571fb1bae" FOREIGN KEY ("carrier_lob_id") REFERENCES "LineOfBusinesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierProcessFlowScenarios" ADD CONSTRAINT "FK_5d5992a18b9f9277b8c855fdc25" FOREIGN KEY ("carrier_case_type_id") REFERENCES "CarrierCaseTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierProcessFlowScenarios" ADD CONSTRAINT "FK_ee8f82616ded89444935d9b798b" FOREIGN KEY ("carrier_assignment_type_modifier_id") REFERENCES "CarrierAssignmentTypeModifiers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierProcessFlows" ADD CONSTRAINT "FK_46fdbb2800c17f12789ebdb2a88" FOREIGN KEY ("carrier_id") REFERENCES "Carriers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierProcessFlows" ADD CONSTRAINT "FK_49ce15604ebe19f949e7c1169db" FOREIGN KEY ("flow_id") REFERENCES "ProcessFlows"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierVendorPreferences" ADD CONSTRAINT "FK_4b57b9da191b1f0aba6f2a2aec7" FOREIGN KEY ("carrier_id") REFERENCES "Carriers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrierVendorPreferences" ADD CONSTRAINT "FK_82643dfa85b31d7bb4599199369" FOREIGN KEY ("vendor_id") REFERENCES "Vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carriers" ADD CONSTRAINT "FK_f7d7a5d7bbd6f17aa4b91da4994" FOREIGN KEY ("contact_id") REFERENCES "Contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cases" ADD CONSTRAINT "FK_2dfb144716df68d10402b8eb9c5" FOREIGN KEY ("carrier_id") REFERENCES "Carriers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cases" ADD CONSTRAINT "FK_4a4164dbfa0ac0ac6925b9bb3d3" FOREIGN KEY ("carrier_case_type_id") REFERENCES "CarrierCaseTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cases" ADD CONSTRAINT "FK_b5a94a84f6eade22b1ebde06518" FOREIGN KEY ("predecesor_case_id") REFERENCES "Cases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimContacts" ADD CONSTRAINT "FK_00ab6aca56a6f8fd7768a9db0b8" FOREIGN KEY ("claim_id") REFERENCES "Claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimContacts" ADD CONSTRAINT "FK_feee2cb97050aabf7762317a0ec" FOREIGN KEY ("contact_id") REFERENCES "Contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimLossTypePairs" ADD CONSTRAINT "FK_49d25893bdf6c2e99a3fd2a0d18" FOREIGN KEY ("type_id") REFERENCES "ClaimLossTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claims" ADD CONSTRAINT "FK_15b1db0054a4646333db01ce299" FOREIGN KEY ("incident_id") REFERENCES "Incidents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claims" ADD CONSTRAINT "FK_4843055e192ab778ad10163b7a1" FOREIGN KEY ("line_of_business_id") REFERENCES "LineOfBusinesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claims" ADD CONSTRAINT "FK_511519afcef4c4e616c87373540" FOREIGN KEY ("policy_type_id") REFERENCES "PolicyTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claims" ADD CONSTRAINT "FK_56e07bd4ba0dbc54648f32daaac" FOREIGN KEY ("loss_type_pair_id") REFERENCES "ClaimLossTypePairs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claims" ADD CONSTRAINT "FK_624c4fb675846df9c2835898818" FOREIGN KEY ("deductible_code_id") REFERENCES "DeductibleCodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claims" ADD CONSTRAINT "FK_a0aa46257fe4223f9b0ac2b2a3b" FOREIGN KEY ("case_id") REFERENCES "Cases"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Claims" ADD CONSTRAINT "FK_caf80a4519c5a1c35f2cd2e55c8" FOREIGN KEY ("carrier_id") REFERENCES "Carriers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claims" ADD CONSTRAINT "FK_cee529f8342919ddbaf4b12f377" FOREIGN KEY ("claim_status_id") REFERENCES "ClaimStatuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claims" ADD CONSTRAINT "FK_e45c06035b32509f957fe8eda54" FOREIGN KEY ("adjuster_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claims" ADD CONSTRAINT "FK_e67e8af4d90a5f3d51d15dd666d" FOREIGN KEY ("independent_adjuster_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claims" ADD CONSTRAINT "FK_ffb7cc4eb5595e54f905ac561ef" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "FK_0838ce2d2ed95f6253ec523fda0" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationContacts" ADD CONSTRAINT "FK_73b75a98082c9cfc7c3de5b9b73" FOREIGN KEY ("conversation_id") REFERENCES "Conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationContacts" ADD CONSTRAINT "FK_ad83d2dbb12fb4ca9fe9bfa57e2" FOREIGN KEY ("contact_id") REFERENCES "Contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversations" ADD CONSTRAINT "FK_6fe80d1be03c1e39f0ffd43c05a" FOREIGN KEY ("claim_id") REFERENCES "Claims"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversations" ADD CONSTRAINT "FK_bac19a305e44599014727562ffc" FOREIGN KEY ("owner_contact_id") REFERENCES "Contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductibleCodes" ADD CONSTRAINT "FK_e3cb92cea96c1b8655a4362d7c4" FOREIGN KEY ("line_of_business_id") REFERENCES "LineOfBusinesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emails" ADD CONSTRAINT "FK_cd719c46f04532b860f8d54752b" FOREIGN KEY ("contact_id") REFERENCES "Contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspQuestions" ADD CONSTRAINT "FK_804db8996ce2b033e9a210a6f1e" FOREIGN KEY ("question_group_id") REFERENCES "InspQuestionGroups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspQuestionsLookups" ADD CONSTRAINT "FK_35290930997e7251b0323cc2fb8" FOREIGN KEY ("by_claim_loss_modifier_ref") REFERENCES "ClaimLossTypeModifiers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspQuestionsLookups" ADD CONSTRAINT "FK_5a65a62d9376458628c4c496ba9" FOREIGN KEY ("by_insp_sub_category_ref") REFERENCES "InspSubjCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspQuestionsLookups" ADD CONSTRAINT "FK_5a9a96feb3cfe7e63cff9adf31f" FOREIGN KEY ("insp_question_group_id") REFERENCES "InspQuestionGroups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspQuestionsLookups" ADD CONSTRAINT "FK_7600548c067746b37f82d63394a" FOREIGN KEY ("by_line_of_business_ref") REFERENCES "LineOfBusinesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspQuestionsLookups" ADD CONSTRAINT "FK_7a6e7cab52112615409bfaf3b2d" FOREIGN KEY ("by_carrier_ref") REFERENCES "Carriers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspQuestionsLookups" ADD CONSTRAINT "FK_d3f96a022a3211d4d7000f1e5ed" FOREIGN KEY ("by_claim_loss_type_ref") REFERENCES "ClaimLossTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspQuestionsLookups" ADD CONSTRAINT "FK_e7df766552f7dbeeb8fa9559ec3" FOREIGN KEY ("by_insp_subject_ref") REFERENCES "InspSubjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspSubjCategPairs" ADD CONSTRAINT "FK_20493e0e6915775539a0c837149" FOREIGN KEY ("sub_category_id") REFERENCES "InspSubjCategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspSubjCategPairs" ADD CONSTRAINT "FK_5a05a82793587294810859ef151" FOREIGN KEY ("subject_id") REFERENCES "InspSubjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspections" ADD CONSTRAINT "FK_060b5e19aaae51068982f4a9bf6" FOREIGN KEY ("author_user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspections" ADD CONSTRAINT "FK_5a30f512f0734742597ab836762" FOREIGN KEY ("claim_id") REFERENCES "Claims"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspections" ADD CONSTRAINT "FK_c97f8d32d3638975b5bcaec55d9" FOREIGN KEY ("type_id") REFERENCES "InspectionTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LobCoverages" ADD CONSTRAINT "FK_1ecd973029c05978ccab3d9f03f" FOREIGN KEY ("line_of_business_id") REFERENCES "LineOfBusinesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "FK_64639781a0447d9cf5e9c141a3c" FOREIGN KEY ("owner_contact_id") REFERENCES "Contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "FK_d8c22eba06a4976b6428e08a21b" FOREIGN KEY ("conversation_id") REFERENCES "Conversations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "FK_02c5a448c70eacbc6dda47f028d" FOREIGN KEY ("voice_call_id") REFERENCES "VoiceCalls"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "FK_815ed3e1a2676863fd6b7ec3e22" FOREIGN KEY ("claim_id") REFERENCES "Claims"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phones" ADD CONSTRAINT "FK_bbd537167a2d5898f74052eb562" FOREIGN KEY ("contact_id") REFERENCES "Contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyTypes" ADD CONSTRAINT "FK_1eeba33b5acaa3d87682706826c" FOREIGN KEY ("line_of_business_id") REFERENCES "LineOfBusinesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "FK_2a62f6c786b0dba20d6a68ece5e" FOREIGN KEY ("phone_id") REFERENCES "Phones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stages" ADD CONSTRAINT "FK_3d0ef6f4c062ed684e5757057ad" FOREIGN KEY ("loss_type_pair_id") REFERENCES "ClaimLossTypePairs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stages" ADD CONSTRAINT "FK_ad1e73d9d419ba8e7d21f3aca1d" FOREIGN KEY ("line_of_business_id") REFERENCES "LineOfBusinesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stages" ADD CONSTRAINT "FK_bf15482cacab47d619e0e23af68" FOREIGN KEY ("carrier_id") REFERENCES "Carriers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskDeliverables" ADD CONSTRAINT "FK_d2f4c47e74d65b7c2f3d2ac6aba" FOREIGN KEY ("task_id") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskStatusTransitions" ADD CONSTRAINT "FK_2867fb0875103de3935f6edde32" FOREIGN KEY ("next_status_id") REFERENCES "TaskStatuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskStatusTransitions" ADD CONSTRAINT "FK_335e4b13b7ef1de3bef3d50c2ce" FOREIGN KEY ("on_action_id") REFERENCES "TaskActions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskStatusTransitions" ADD CONSTRAINT "FK_6b4bf88d8c16bd510ba89052ca9" FOREIGN KEY ("initial_status_id") REFERENCES "TaskStatuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "FK_a2f5a766d7d9f4f9a6bf6de9148" FOREIGN KEY ("stage_id") REFERENCES "Stages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCarriers" ADD CONSTRAINT "FK_311e308b20a03dbfc0410e32477" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCarriers" ADD CONSTRAINT "FK_c1cdf66975297ce97bb66fb2861" FOREIGN KEY ("carrier_id") REFERENCES "Carriers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFcmTokens" ADD CONSTRAINT "FK_9f1d3edefde2377ff521a66f1d6" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLanguages" ADD CONSTRAINT "FK_0bb4bc263cade7c98526571902c" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLanguages" ADD CONSTRAINT "FK_7439465ad015821d1bcd28ed939" FOREIGN KEY ("language_id") REFERENCES "Languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserServiceAreas" ADD CONSTRAINT "FK_9c56dcd0c198f8fee39ce002bca" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpecialityServices" ADD CONSTRAINT "FK_55831f1ba2d399f8f08cafdc592" FOREIGN KEY ("service_id") REFERENCES "Services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpecialityServices" ADD CONSTRAINT "FK_a501be46b2d99043e4c8aae53c1" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpecialityServices" ADD CONSTRAINT "FK_c25708686c3c74ce6540edb4ddc" FOREIGN KEY ("speciality_id") REFERENCES "Specialities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVendors" ADD CONSTRAINT "FK_44f0b9d4d643e4e46d297a07f9b" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVendors" ADD CONSTRAINT "FK_b68630da97c7e961a70de24fc1b" FOREIGN KEY ("vendor_id") REFERENCES "Vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorCarrier" ADD CONSTRAINT "FK_261b524ff133eba66f5862f093d" FOREIGN KEY ("vendor_id") REFERENCES "Vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorCarrier" ADD CONSTRAINT "FK_75220eec9f305c326d54bc6d457" FOREIGN KEY ("carrier_id") REFERENCES "Carriers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorServiceAreas" ADD CONSTRAINT "FK_0bba21e8828613dd576cc49205f" FOREIGN KEY ("vendor_id") REFERENCES "Vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorSpecialty" ADD CONSTRAINT "FK_75f1d001ea3872ec0c7236af134" FOREIGN KEY ("speciality_id") REFERENCES "Specialities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorSpecialty" ADD CONSTRAINT "FK_8154076c49742a0c482c717d9fb" FOREIGN KEY ("vendor_id") REFERENCES "Vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorUserPreferences" ADD CONSTRAINT "FK_0f7f127d826073a406fcf1b2b87" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorUserPreferences" ADD CONSTRAINT "FK_842e944844fee85491da4418744" FOREIGN KEY ("vendor_id") REFERENCES "Vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendors" ADD CONSTRAINT "FK_737d40927709ee2a91a7f7ee475" FOREIGN KEY ("contact_id") REFERENCES "Contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoRooms" ADD CONSTRAINT "FK_10f15506115da9cd0886b87503a" FOREIGN KEY ("conversation_id") REFERENCES "Conversations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoRooms" ADD CONSTRAINT "FK_eaf76d87a82a7cbdc682fd3359d" FOREIGN KEY ("owner_contact_id") REFERENCES "Contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoiceCalls" ADD CONSTRAINT "FK_5cb9ffaa92553fb13c596b5bc4b" FOREIGN KEY ("conversation_id") REFERENCES "Conversations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vouchers" ADD CONSTRAINT "FK_3724ca03be45f51e8b22b110366" FOREIGN KEY ("claim_id") REFERENCES "Claims"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vouchers" ADD CONSTRAINT "FK_c3a009bfe6ba1a73bbaae0e3ebe" FOREIGN KEY ("type_id") REFERENCES "VoucherTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowPublications" ADD CONSTRAINT "FK_6263a222998588304bb7d4cecea" FOREIGN KEY ("task_work_id") REFERENCES "Works"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "FK_0858fc05f459a9fe2a14767ab2d" FOREIGN KEY ("status_id") REFERENCES "TaskStatuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "FK_1a31941d893807ee22babc0fddc" FOREIGN KEY ("assignment_workflow_pub_id") REFERENCES "WorkflowPublications"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "FK_9320399bdb571165be5d166a78f" FOREIGN KEY ("claim_id") REFERENCES "Claims"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "FK_b6105a76f994f9ecd609ab8d0bd" FOREIGN KEY ("team_member_id") REFERENCES "AssignmentTeamMembers"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "FK_dc275e707d59aa32c3367a6d263" FOREIGN KEY ("assignment_id") REFERENCES "Assignments"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "FK_f46e8add1193c27f9a77373b3b8" FOREIGN KEY ("task_id") REFERENCES "Tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "FK_f759a2196e1e5b25f01897e399e" FOREIGN KEY ("assignment_user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coffee_flavors_flavor" ADD CONSTRAINT "FK_25642975c6f620d570c635f418d" FOREIGN KEY ("flavorId") REFERENCES "flavor_index"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coffee_flavors_flavor" ADD CONSTRAINT "FK_9cb98a3799afc95cf71fdb1c4f9" FOREIGN KEY ("coffeeId") REFERENCES "coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

