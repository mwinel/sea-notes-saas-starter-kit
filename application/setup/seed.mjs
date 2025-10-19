import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// All available categories matching the data-table
const categories = [
  'Travel',
  'Work',
  'Ideas',
  'Design',
  'Capabilities',
  'Personal',
  'Projects',
  'Meetings',
  'Tasks',
  'Research',
  'Goals',
  'Journal',
  'Books',
  'Learning',
  'Shopping',
  'Health',
];

const statuses = ['Done', 'Draft'];

// Template parts for generating diverse titles
const titlePrefixes = [
  'Q4',
  'Q1',
  'Q2',
  'Q3',
  'Weekly',
  'Monthly',
  'Annual',
  'Daily',
  'Sprint',
  'Phase 1',
  'Phase 2',
  'New',
  'Updated',
  'Revised',
  'Final',
  'Draft',
  'Initial',
  'Advanced',
];

const titleSubjects = [
  'Project Planning',
  'Team Meeting',
  'Strategy Session',
  'Review',
  'Analysis',
  'Implementation',
  'Research',
  'Discovery',
  'Proposal',
  'Presentation',
  'Report',
  'Roadmap',
  'Architecture',
  'Design System',
  'User Testing',
  'Performance Metrics',
  'Budget Planning',
  'Resource Allocation',
  'Risk Assessment',
  'Goal Setting',
];

const titleActions = [
  'Meeting Notes',
  'Action Items',
  'Summary',
  'Checklist',
  'Ideas',
  'Recommendations',
  'Tasks',
  'Feedback',
  'Updates',
  'Guidelines',
  'Best Practices',
  'Documentation',
  'List',
  'Plan',
  'Overview',
  'Insights',
  'Findings',
  'Conclusions',
];

// Template parts for generating diverse content
const contentStarters = [
  'Key points to remember:',
  'Action items:',
  'Important notes:',
  'Main objectives:',
  'Summary of discussion:',
  'Things to consider:',
  'Next steps:',
  'Quick notes:',
  'Brainstorming session:',
  'Follow-up items:',
];

const contentItems = [
  'Review project timeline and adjust milestones as needed',
  'Coordinate with team members on deliverables',
  'Update documentation and share with stakeholders',
  'Schedule follow-up meeting to discuss progress',
  'Research best practices and industry standards',
  'Gather feedback from users and analyze results',
  'Optimize workflow for better efficiency',
  'Implement new features based on requirements',
  'Test thoroughly before deployment',
  'Monitor metrics and adjust strategy accordingly',
  'Collaborate with cross-functional teams',
  'Prepare presentation materials for leadership',
  'Allocate resources and budget appropriately',
  'Identify potential risks and mitigation strategies',
  'Document lessons learned and share insights',
  'Review competitive landscape and market trends',
  'Set clear objectives and success criteria',
  'Establish communication protocols',
  'Create detailed technical specifications',
  'Develop comprehensive testing strategy',
  'Ensure compliance with security standards',
  'Streamline processes for better productivity',
  'Gather requirements from all stakeholders',
  'Build consensus among team members',
  'Track progress against defined milestones',
  'Evaluate different approaches and solutions',
  'Prioritize tasks based on impact and urgency',
  'Maintain clear documentation throughout',
  'Foster collaboration and knowledge sharing',
  'Continuously improve based on feedback',
];

// Helper function to generate random title
function generateTitle() {
  const usePrefix = Math.random() > 0.3;
  const useSubject = Math.random() > 0.2;

  let title = '';

  if (usePrefix) {
    title += titlePrefixes[Math.floor(Math.random() * titlePrefixes.length)] + ' ';
  }

  if (useSubject) {
    title += titleSubjects[Math.floor(Math.random() * titleSubjects.length)] + ' ';
  }

  title += titleActions[Math.floor(Math.random() * titleActions.length)];

  return title;
}

// Helper function to generate random content
function generateContent() {
  const starter = contentStarters[Math.floor(Math.random() * contentStarters.length)];
  const numItems = Math.floor(Math.random() * 4) + 2; // 2-5 items

  const items = [];
  const usedIndices = new Set();

  for (let i = 0; i < numItems; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * contentItems.length);
    } while (usedIndices.has(index));

    usedIndices.add(index);
    items.push(`- ${contentItems[index]}`);
  }

  return `${starter}\n\n${items.join('\n')}`;
}

async function main() {
  console.log('🌱 Starting seed...');

  // Find or create a user for the notes
  let user = await prisma.user.findUnique({
    where: {
      email: 'test@example.com',
    },
  });

  if (!user) {
    console.log('👤 Creating test user...');
    // Hash password the same way as helpers/hash.ts (which uses bcrypt)
    const hashedPassword = await bcrypt.hash('password123', 10);

    user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        passwordHash: hashedPassword,
        emailVerified: true,
        role: 'USER', // Same as USER_ROLES.USER
      },
    });

    console.log('✅ Test user created');

    // Create a subscription for the user
    console.log('📋 Creating subscription for user...');
    await prisma.subscription.create({
      data: {
        userId: user.id,
        plan: 'FREE', // Same as SubscriptionPlanEnum.FREE
        status: 'ACTIVE', // Same as SubscriptionStatusEnum.ACTIVE
      },
    });
    console.log('✅ Subscription created');
  } else {
    console.log('👤 Using existing test user');

    // Clear existing notes for this user
    const existingNotesCount = await prisma.note.count({
      where: { userId: user.id },
    });

    if (existingNotesCount > 0) {
      console.log(`🗑️  Clearing ${existingNotesCount} existing notes...`);
      await prisma.note.deleteMany({
        where: { userId: user.id },
      });
      console.log('✅ Existing notes cleared');
    }
  }

  // Create 200 notes using Prisma (same underlying method as createNote API)
  console.log('📝 Generating 200 notes...');

  const notesData = [];
  const categoryDistribution = {};
  const statusDistribution = {};

  for (let i = 0; i < 200; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    // Track distribution
    categoryDistribution[category] = (categoryDistribution[category] || 0) + 1;
    statusDistribution[status] = (statusDistribution[status] || 0) + 1;

    notesData.push({
      userId: user.id,
      title: generateTitle(),
      content: generateContent(),
      category,
      status,
    });

    // Progress indicator
    if ((i + 1) % 50 === 0) {
      console.log(`   Generated ${i + 1}/200 notes...`);
    }
  }

  console.log('💾 Saving notes to database...');

  // Batch create for better performance
  await prisma.note.createMany({
    data: notesData,
  });

  console.log('\n✅ Seed completed successfully!');
  console.log('━'.repeat(50));
  console.log(`📧 User email: ${user.email}`);
  console.log(`🔑 User password: password123`);
  console.log(`📊 Created 200 notes across ${categories.length} categories`);
  console.log('\n📈 Category Distribution:');
  Object.entries(categoryDistribution)
    .sort(([, a], [, b]) => b - a)
    .forEach(([category, count]) => {
      const bar = '█'.repeat(Math.ceil(count / 2));
      console.log(`   ${category.padEnd(15)} ${bar} ${count}`);
    });
  console.log('\n📊 Status Distribution:');
  Object.entries(statusDistribution).forEach(([status, count]) => {
    const bar = '█'.repeat(Math.ceil(count / 2));
    console.log(`   ${status.padEnd(15)} ${bar} ${count}`);
  });
  console.log('━'.repeat(50));
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('👋 Seeder finished');
  });
