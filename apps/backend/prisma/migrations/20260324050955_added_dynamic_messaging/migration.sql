-- CreateEnum
CREATE TYPE "MessagingEventKeyEnum" AS ENUM ('SIGN_UP_OTP_GENERATE', 'PASSWORD_RESET', 'PASSWORD_RESET_SUCCESS', 'WELCOME_EMAIL');

-- CreateEnum
CREATE TYPE "MessagingLogStatusEnum" AS ENUM ('FAILED', 'QUEUED', 'SENT', 'SENDING');

-- CreateEnum
CREATE TYPE "MessagingChannel" AS ENUM ('EMAIL', 'SMS', 'WHATSAPP', 'PUSH');

-- CreateEnum
CREATE TYPE "MessagePriorityEnum" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "messaging_event" (
    "id" TEXT NOT NULL,
    "key" "MessagingEventKeyEnum" NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,
    "created_by" TEXT,

    CONSTRAINT "messaging_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messaging_template" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "channel" "MessagingChannel" NOT NULL,
    "title" TEXT,
    "subject" TEXT,
    "body" TEXT,
    "cc" JSONB,
    "bcc" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(0),
    "updated_by" TEXT,
    "created_by" TEXT,

    CONSTRAINT "messaging_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messaging_channel_config" (
    "id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "channel" "MessagingChannel" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "profile_id" TEXT NOT NULL,
    "priority" "MessagePriorityEnum" NOT NULL DEFAULT 'MEDIUM',
    "options" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(0),
    "updated_by" TEXT,
    "created_by" TEXT,

    CONSTRAINT "messaging_channel_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messaging_profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channel" "MessagingChannel" NOT NULL,
    "provider_name" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "options" JSONB,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "priority" "MessagePriorityEnum",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(0),
    "updated_by" TEXT,
    "created_by" TEXT,

    CONSTRAINT "messaging_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messaging_log" (
    "id" TEXT NOT NULL,
    "template_id" TEXT,
    "channel" "MessagingChannel" NOT NULL,
    "profile_id" TEXT,
    "to" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "priority" "MessagePriorityEnum" NOT NULL DEFAULT 'MEDIUM',
    "status" "MessagingLogStatusEnum" NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "result" JSONB,
    "error" TEXT,
    "scheduled_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,
    "created_by" TEXT,

    CONSTRAINT "messaging_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "messaging_event_key_key" ON "messaging_event"("key");

-- CreateIndex
CREATE UNIQUE INDEX "messaging_channel_config_template_id_profile_id_channel_key" ON "messaging_channel_config"("template_id", "profile_id", "channel");

-- AddForeignKey
ALTER TABLE "messaging_event" ADD CONSTRAINT "messaging_event_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_event" ADD CONSTRAINT "messaging_event_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_template" ADD CONSTRAINT "messaging_template_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_template" ADD CONSTRAINT "messaging_template_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_template" ADD CONSTRAINT "messaging_template_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "messaging_event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_channel_config" ADD CONSTRAINT "messaging_channel_config_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_channel_config" ADD CONSTRAINT "messaging_channel_config_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_channel_config" ADD CONSTRAINT "messaging_channel_config_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "messaging_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_channel_config" ADD CONSTRAINT "messaging_channel_config_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "messaging_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_profile" ADD CONSTRAINT "messaging_profile_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_profile" ADD CONSTRAINT "messaging_profile_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_log" ADD CONSTRAINT "messaging_log_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_log" ADD CONSTRAINT "messaging_log_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_log" ADD CONSTRAINT "messaging_log_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "messaging_template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messaging_log" ADD CONSTRAINT "messaging_log_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "messaging_profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
