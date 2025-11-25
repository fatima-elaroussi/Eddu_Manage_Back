import app from "./app";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

// Test database connection
async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
    
    // Optional: Show counts of records
    const studentCount = await prisma.etudiant.count();
    const teacherCount = await prisma.enseignant.count();
    const classCount = await prisma.classe.count();
    
    console.log(`📊 Database Stats:`);
    console.log(`   - Students: ${studentCount}`);
    console.log(`   - Teachers: ${teacherCount}`);
    console.log(`   - Classes: ${classCount}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    console.error("Please check your DATABASE_URL in .env file");
    process.exit(1); // Exit if database is not connected
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await testDatabaseConnection();
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("\n👋 Database disconnected");
  process.exit(0);
});

