from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="OPYO Ecosystem API")
api_router = APIRouter(prefix="/api")


# ============ MODELS ============

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    code: str  # e.g., "OPYO.NEXUS"
    name: str
    tagline: str
    description: str
    category: str  # "OS" | "STUDIO" | "PLATFORM" | "EXPERIMENT"
    status: str  # "LIVE" | "BETA" | "IN_DEV" | "CONCEPT"
    image_url: Optional[str] = None
    order: int = 0


class Person(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    bio: str
    avatar_url: Optional[str] = None
    order: int = 0


class CareerApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    role: str
    portfolio_url: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CareerApplicationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    role: str = Field(min_length=2, max_length=120)
    portfolio_url: Optional[str] = Field(default=None, max_length=500)
    message: str = Field(min_length=10, max_length=3000)


# ============ SEED DATA ============

SEED_PROJECTS = [
    {
        "code": "OPYO.NEXUS",
        "name": "OPYO Nexus",
        "tagline": "AI workstation for creators, developers, and streamers.",
        "description": "A sovereign AI workstation that unifies chat, code, streaming, and automation into one intelligent environment. Context-aware agents, an integrated IDE, a full terminal, voice control, a plugin surface, and multi-model routing across GPT, Claude, and local models.",
        "category": "WORKSTATION",
        "status": "BETA",
        "order": 1,
    },
    {
        "code": "OPYO.ENGINE",
        "name": "OPYO Engine",
        "tagline": "AI streaming infrastructure.",
        "description": "Broadcast engine, AI moderator, AI streaming partner, smart highlights, and avatar system — the real-time runtime that turns gameplay into an intelligent stream.",
        "category": "INFRASTRUCTURE",
        "status": "IN_DEV",
        "order": 2,
    },
    {
        "code": "PRZMO",
        "name": "PRZMO",
        "tagline": "Identity and network layer for gaming.",
        "description": "Gamer profiles, tournaments, creator marketplace, and communities — a portable identity graph that travels with the player across every title in the ecosystem.",
        "category": "PLATFORM",
        "status": "IN_DEV",
        "order": 3,
    },
    {
        "code": "OPYO.STUDIOS",
        "name": "OPYO Studios",
        "tagline": "Games, original IPs, and indie publishing.",
        "description": "Publishing label for worlds worth living in — original IPs, selective indie publishing, and creator-driven promotion engineered with AI-native tooling.",
        "category": "STUDIO",
        "status": "LIVE",
        "order": 4,
    },
    {
        "code": "OPYO.LABS/001",
        "name": "Lucid Engine",
        "tagline": "Realtime narrative agent mesh.",
        "description": "An experimental AI director that shapes quests, pacing, and dialogue on the fly — a research spike powering future Studios releases.",
        "category": "EXPERIMENT",
        "status": "CONCEPT",
        "order": 10,
    },
    {
        "code": "OPYO.LABS/002",
        "name": "Signal",
        "tagline": "Low-latency coach for competitive play.",
        "description": "On-device analysis for reflex, positioning, and macro decisions. A glimpse at what Engine becomes when it plays with you, not just around you.",
        "category": "EXPERIMENT",
        "status": "CONCEPT",
        "order": 11,
    },
    {
        "code": "OPYO.LABS/003",
        "name": "Arena Protocol",
        "tagline": "Trust fabric for cross-title tournaments.",
        "description": "A verifiable, publisher-agnostic match layer — the invisible plumbing of PRZMO's tournament network.",
        "category": "EXPERIMENT",
        "status": "CONCEPT",
        "order": 12,
    },
]

SEED_PEOPLE = [
    {"name": "Operator 01", "role": "Founder & CEO", "bio": "Platform architect. Builds ecosystems from first principles.", "order": 1},
    {"name": "Operator 02", "role": "Chief Technology Officer", "bio": "Streaming & AI infrastructure.", "order": 2},
    {"name": "Operator 03", "role": "Head of Community", "bio": "Campus network & club leads.", "order": 3},
    {"name": "Operator 04", "role": "Head of Platform", "bio": "Identity, networks, trust.", "order": 4},
    {"name": "Operator 05", "role": "Head of Strem0", "bio": "Creator tooling & streaming.", "order": 5},
    {"name": "Operator 06", "role": "Design Lead", "bio": "Player-first interfaces.", "order": 6},
]


# ============ ROUTES ============

@api_router.get("/")
async def root():
    return {"service": "OPYO.API", "status": "online", "version": "0.1.0"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@api_router.get("/projects", response_model=List[Project])
async def list_projects():
    docs = await db.projects.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return [Project(**d) for d in docs]


@api_router.get("/people", response_model=List[Person])
async def list_people():
    docs = await db.people.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return [Person(**d) for d in docs]


@api_router.post("/careers/apply", response_model=CareerApplication)
async def submit_application(payload: CareerApplicationCreate):
    app_obj = CareerApplication(**payload.model_dump())
    doc = app_obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.career_applications.insert_one(doc)
    return app_obj


@api_router.get("/careers/applications", response_model=List[CareerApplication])
async def list_applications():
    docs = await db.career_applications.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for doc in docs:
        if isinstance(doc.get("created_at"), str):
            doc["created_at"] = datetime.fromisoformat(doc["created_at"])
    return [CareerApplication(**doc) for doc in docs]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============ SEED ON STARTUP ============

@app.on_event("startup")
async def seed_collections():
    try:
        # Upsert projects by `code` so updated seed data is always applied on restart
        for p in SEED_PROJECTS:
            obj = Project(**p).model_dump()
            await db.projects.update_one(
                {"code": obj["code"]},
                {"$set": obj},
                upsert=True,
            )
        # Remove any stale projects whose code is no longer in the seed list
        active_codes = [p["code"] for p in SEED_PROJECTS]
        await db.projects.delete_many({"code": {"$nin": active_codes}})
        logger.info("Projects collection upserted from seed")

        if await db.people.count_documents({}) == 0:
            for p in SEED_PEOPLE:
                obj = Person(**p).model_dump()
                await db.people.insert_one(obj)
            logger.info("Seeded people collection")
    except Exception as e:
        logger.error(f"Seed error: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
