--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-06-18 20:17:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 24734)
-- Name: coaches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coaches (
    id integer NOT NULL,
    name text NOT NULL,
    email text,
    phone text,
    role text DEFAULT 'trainer'::text,
    password text
);


ALTER TABLE public.coaches OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24733)
-- Name: coaches_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coaches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coaches_id_seq OWNER TO postgres;

--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 225
-- Name: coaches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coaches_id_seq OWNED BY public.coaches.id;


--
-- TOC entry 228 (class 1259 OID 24747)
-- Name: exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercises (
    id integer NOT NULL,
    trainee_id integer,
    day character varying(20),
    name character varying(255),
    body_part character varying(100),
    equipment character varying(100),
    target character varying(100)
);


ALTER TABLE public.exercises OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24746)
-- Name: exercises_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exercises_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exercises_id_seq OWNER TO postgres;

--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 227
-- Name: exercises_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exercises_id_seq OWNED BY public.exercises.id;


--
-- TOC entry 224 (class 1259 OID 24722)
-- Name: trainees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trainees (
    id integer NOT NULL,
    name text NOT NULL,
    age integer,
    initials character varying(10),
    coach_id integer,
    email text,
    height integer,
    weight integer,
    role text DEFAULT 'trainee'::text,
    password text
);


ALTER TABLE public.trainees OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24721)
-- Name: trainees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trainees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trainees_id_seq OWNER TO postgres;

--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 223
-- Name: trainees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trainees_id_seq OWNED BY public.trainees.id;


--
-- TOC entry 4763 (class 2604 OID 24737)
-- Name: coaches id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coaches ALTER COLUMN id SET DEFAULT nextval('public.coaches_id_seq'::regclass);


--
-- TOC entry 4765 (class 2604 OID 24750)
-- Name: exercises id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises ALTER COLUMN id SET DEFAULT nextval('public.exercises_id_seq'::regclass);


--
-- TOC entry 4761 (class 2604 OID 24725)
-- Name: trainees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trainees ALTER COLUMN id SET DEFAULT nextval('public.trainees_id_seq'::regclass);


--
-- TOC entry 4924 (class 0 OID 24734)
-- Dependencies: 226
-- Data for Name: coaches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coaches (id, name, email, phone, role, password) FROM stdin;
1	Coach Omar	\N	\N	trainer	\N
2	Coach Sarah	\N	\N	trainer	\N
3	Coach A	coachA@example.com	1234567890	trainer	\N
4	Coach B	coachB@example.com	2345678901	trainer	\N
5	Coach C	coachC@example.com	3456789012	trainer	\N
6	Moshtarak Omar	omaromar@gmail.com	0796498051	trainer	Omarisomar12@
7	hamza ahmad	hamza@gmail.com	0798497957	trainer	123123123
\.


--
-- TOC entry 4926 (class 0 OID 24747)
-- Dependencies: 228
-- Data for Name: exercises; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercises (id, trainee_id, day, name, body_part, equipment, target) FROM stdin;
402	20	Monday	\N	waist	body weight	abs
403	20	Monday	\N	waist	body weight	abs
5	2	Monday	3/4 sit-up	waist	body weight	abs
6	2	Monday	45° side bend	waist	body weight	abs
7	2	Monday	air bike	waist	body weight	abs
8	2	Monday	alternate heel touchers	waist	body weight	abs
18	1	Monday	45° side bend	waist	body weight	abs
19	1	Monday	air bike	waist	body weight	abs
20	1	Monday	alternate heel touchers	waist	body weight	abs
21	1	Thursday	45° side bend	waist	body weight	abs
22	1	Thursday	alternate heel touchers	waist	body weight	abs
23	1	Thursday	45° side bend	waist	body weight	abs
24	1	Thursday	3/4 sit-up	waist	body weight	abs
435	21	Wednesday	alternate heel touchers	waist	body weight	abs
436	21	Wednesday	assisted chest dip (kneeling)	chest	leverage machine	pectorals
437	21	Wednesday	45° side bend	waist	body weight	abs
438	21	Wednesday	3/4 sit-up	waist	body weight	abs
442	21	Monday	45° side bend	waist	body weight	abs
443	21	Tuesday	45° side bend	waist	body weight	abs
444	21	Tuesday	45° side bend	waist	body weight	abs
445	21	Tuesday	45° side bend	waist	body weight	abs
446	21	Tuesday	air bike	waist	body weight	abs
447	21	Tuesday	alternate heel touchers	waist	body weight	abs
448	21	Friday	3/4 sit-up	waist	body weight	abs
449	21	Friday	assisted chest dip (kneeling)	chest	leverage machine	pectorals
450	21	Friday	assisted hanging knee raise with throw down	waist	assisted	abs
451	21	Friday	alternate lateral pulldown	back	cable	lats
452	21	Friday	45° side bend	waist	body weight	abs
453	21	Monday	45° side bend	waist	body weight	abs
454	21	Monday	air bike	waist	body weight	abs
250	20	Sunday	\N	waist	body weight	abs
251	20	Sunday	\N	waist	body weight	abs
252	20	Sunday	\N	waist	body weight	abs
253	20	Sunday	\N	waist	body weight	abs
392	20	Monday	alternate heel touchers	waist	body weight	abs
393	20	Tuesday	45° side bend	waist	body weight	abs
394	20	Tuesday	45° side bend	waist	body weight	abs
395	20	Sunday	\N	waist	body weight	abs
396	20	Sunday	\N	waist	body weight	abs
397	20	Sunday	\N	chest	leverage machine	pectorals
398	20	Sunday	\N	chest	leverage machine	pectorals
\.


--
-- TOC entry 4922 (class 0 OID 24722)
-- Dependencies: 224
-- Data for Name: trainees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trainees (id, name, age, initials, coach_id, email, height, weight, role, password) FROM stdin;
2	Sarah Chen	32	SC	1	\N	\N	\N	trainee	\N
3	Mike Davis	25	MD	1	\N	\N	\N	trainee	\N
4	Emma Wilson	29	EW	1	\N	\N	\N	trainee	\N
5	Liam Grant	24	LG	2	\N	\N	\N	trainee	\N
7	Alice	25	AL	1	alice@example.com	165	60	trainee	\N
9	Charlie	22	CH	2	charlie@example.com	180	68	trainee	\N
10	Diana	30	DI	2	diana@example.com	158	55	trainee	\N
11	Ethan	27	ET	3	ethan@example.com	170	70	trainee	\N
12	Fiona	26	FI	3	fiona@example.com	162	58	trainee	\N
8	Bobasd	28	BO	5	bob@example.com	172	75	trainee	\N
14		\N	\N	3	yumoxgamer@gmail.com	\N	\N	trainee	$2b$10$7qdWqY96koUwTwKLC9rHueJ.d/iEvtjFTVzd5JpcG3PAHMXBDRfc6
1	Alex Thompson	28	AT	1	\N	\N	\N	trainee	\N
15	asdasdasd	\N	\N	\N	asdasdasd@gmil.com	\N	\N	trainee	$2b$10$2uAaFhbvVYO/32oPyzUPQ.axM.PHTrqiBR5MykS8r6wRpghmCKfb2
16	asdasdasdasd	\N	\N	\N	asdasdasasdd@gmil.com	\N	\N	trainee	$2b$10$.akxVhUEmKP2VjpzUIbhQ.ghuojILcjWHrnJMZ.AzKkilsF/2b0W.
17	AHMADHMAD	\N	\N	\N	AHMADHMAD@gmail.com	\N	\N	trainee	$2b$10$S102iNWjwpqu9h.qfk7Duu2JXTibv8yqxivukxfe7Sshab2JIaqHa
6	Nina Hart	27	NH	2	\N	\N	\N	trainee	\N
20	Moshtarak Omar	\N	\N	6	moshtarakoando@gmail.com	\N	\N	trainee	Omarisomar12@
22	saifan	\N	\N	\N	saifan@gmail.com	\N	\N	trainee	123123123
23	tariq ziad	\N	\N	7	tariq@gmail.com	\N	\N	trainee	123123
24	noor	\N	\N	2	noor@gmail.com	111	111	trainee	123123
21	bob	\N	\N	7	bob@gmail.com	175	50	trainee	123123123
\.


--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 225
-- Name: coaches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coaches_id_seq', 7, true);


--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 227
-- Name: exercises_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercises_id_seq', 454, true);


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 223
-- Name: trainees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trainees_id_seq', 24, true);


--
-- TOC entry 4771 (class 2606 OID 24766)
-- Name: coaches coaches_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coaches
    ADD CONSTRAINT coaches_email_key UNIQUE (email);


--
-- TOC entry 4773 (class 2606 OID 24741)
-- Name: coaches coaches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coaches
    ADD CONSTRAINT coaches_pkey PRIMARY KEY (id);


--
-- TOC entry 4775 (class 2606 OID 24754)
-- Name: exercises exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (id);


--
-- TOC entry 4767 (class 2606 OID 24763)
-- Name: trainees trainees_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trainees
    ADD CONSTRAINT trainees_email_key UNIQUE (email);


--
-- TOC entry 4769 (class 2606 OID 24729)
-- Name: trainees trainees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trainees
    ADD CONSTRAINT trainees_pkey PRIMARY KEY (id);


-- Completed on 2025-06-18 20:17:23

--
-- PostgreSQL database dump complete
--

