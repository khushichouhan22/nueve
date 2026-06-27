CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"dob" date NOT NULL,
	"phone" varchar(20) NOT NULL,
	"attendance" integer NOT NULL,
	"attendance_status" varchar(20) NOT NULL,
	"semester" varchar(50) NOT NULL,
	"role" varchar(20) DEFAULT 'STUDENT' NOT NULL,
	"registered_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
