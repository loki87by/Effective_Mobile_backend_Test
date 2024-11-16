DO $$
BEGIN

CREATE DATABASE "Effective_mobile"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE ROLE summer WITH LOGIN PASSWORD 'arctic_fox';
GRANT USAGE ON SCHEMA public TO summer;

CREATE TABLE IF NOT EXISTS public.actions
(
    shop_id text COLLATE pg_catalog."default" NOT NULL,
    plu text COLLATE pg_catalog."default" NOT NULL,
    action text COLLATE pg_catalog."default" NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "updatedAt" timestamp with time zone,
    "createdAt" timestamp with time zone,
    CONSTRAINT "Actions_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.actions
    OWNER to summer;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.actions TO summer;


CREATE ROLE god WITH LOGIN PASSWORD 'IDDQD';
GRANT USAGE ON SCHEMA public TO god; 

CREATE TABLE IF NOT EXISTS public.products
(
    plu text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT product_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to god;

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.products TO god;

CREATE TABLE IF NOT EXISTS public.stocks
(
    in_cell integer NOT NULL,
    in_order integer NOT NULL,
    shop_id text COLLATE pg_catalog."default" NOT NULL,
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    product_id bigint NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT stock_pkey PRIMARY KEY (id),
    CONSTRAINT stock_fk FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.stocks
    OWNER to god;

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.stocks TO god;

CREATE ROLE reception WITH LOGIN PASSWORD 'welcome';
GRANT USAGE ON SCHEMA public TO reception;

CREATE TABLE IF NOT EXISTS public.users
(
    first_name text COLLATE pg_catalog."default" NOT NULL,
    last_name text COLLATE pg_catalog."default" NOT NULL,
    age integer NOT NULL,
    gender text COLLATE pg_catalog."default" NOT NULL,
    troubles boolean NOT NULL,
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to reception;

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.users TO reception;

commit;

END $$;