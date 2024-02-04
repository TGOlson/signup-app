import { PrismaClient } from '@prisma/client';

const main = async (): Promise<void> => {
  console.log('Seeding database');

  const prisma = new PrismaClient();

  const user = await prisma.user.create({
    data: {
      firstName: 'Tyler',
      lastName: 'Olson',
      email: 'tydotg@gmail.com',
    }
  });

  const [signup1, signup2] = await Promise.all([{
      published: true,
      title: 'Summer Camp 2024',
      description: 'Signups for summer camp 2024. This is going to be a great time. We will have a lot of fun.',
      authorId: user.id,
    }, {
      published: true,
      title: 'Test Signup 2',
      description: 'This is a test signup 2',
      authorId: user.id,
    }, {
      published: false,
      title: 'Unpublished Signup',
      description: 'This is a an unpublished signup',
      authorId: user.id,
    }
  ]
    .map(async (signup) => await prisma.signup.create({data: signup}))
  );

  const [option1, option2, _option3, _option4] = await Promise.all([{
      title: 'Camp Week 1 - this is the best one',
      description: 'Really fun week of camp. Everyone should sign up. Once you do make sure to bring a sleeping bag and a pillow. Also, bring a toothbrush.',
      quantity: 10,
      date: new Date('2-1-2024'),
      signupId: signup1.id,
      index: 0,
    }, {
      title: 'Camp Week 2',
      description: 'This is the second week of camp. Make sure to do stuff!',
      quantity: 10,
      date: new Date('2-8-2024'),
      signupId: signup1.id,
      index: 1,
    }, {
      title: 'Camp Week 3',
      description: 'This is the third week of camp. Make sure to do stuff!',
      quantity: 10,
      date: new Date('2-15-2024'),
      signupId: signup1.id,
      index: 2,
    }, {
      title: 'Option 1',
      description: 'This is the first option',
      quantity: 4,
      date: new Date(),
      signupId: signup2.id,
      index: 0,
    }, {
      title: 'Option 2',
      description: 'This is the second option',
      quantity: 4,
      date: new Date(),
      signupId: signup2.id,
      index: 1,
    }]
    .map(async (signupOption) => await prisma.signupOption.create({data: signupOption}))
  );

  await Promise.all([
    {
      firstName: 'Conrad',
      lastName: 'Carlson',
      email: 'fake1@example.com',
      quantity: 1,
      signupOptionId: option1.id,
      comment: 'So excited!',
    },
    {
      firstName: 'Steven',
      lastName: 'Windward',
      email: 'fake2@example.com',
      quantity: 2,
      signupOptionId: option1.id,
      comment: 'I have 2 coming! Whoohoo!'
    },
    {
      firstName: 'Carroll',
      lastName: 'Caroline',
      email: 'fake3@example.com',
      quantity: 1,
      signupOptionId: option1.id,
    },
    {
      firstName: 'Carroll',
      lastName: 'Caroline',
      email: 'fake3@example.com',
      quantity: 1,
      signupOptionId: option2.id,
    }
  ]
    .map(async (participant) => await prisma.participant.create({data: participant}))
  );

  console.log('Done!');
};

main();
