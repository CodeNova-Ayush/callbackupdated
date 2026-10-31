import { auth } from '../lib/auth';

const seed_demo_user = async () => {
  if (process.env.SEED_DEMO !== 'true' || process.env.NODE_ENV === 'production') {
    console.log('Skipping demo seed. Set SEED_DEMO=true outside production to create one demo user.');
    return;
  }
  const password = process.env.SEED_DEMO_PASSWORD;
  if (!password || password.length < 10) {
    console.log('Skipping demo seed. Set SEED_DEMO_PASSWORD (10+ characters).');
    return;
  }
  try {
    await auth.api.signUpEmail({
      body: {
        name: 'Demo Candidate',
        email: 'demo@callback.ai',
        password,
      },
    });
    console.log('Created demo@callback.ai');
  } catch (error) {
    console.log('Demo user was not created. It may already exist.');
    console.error(error);
  }
};

seed_demo_user();
