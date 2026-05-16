'use server';
/**
 * @fileOverview A Genkit flow for generating personalized fueling missions.
 *
 * - personalizedFuelingMissions - A function that generates a personalized fueling mission.
 * - PersonalizedFuelingMissionsInput - The input type for the personalizedFuelingMissions function.
 * - PersonalizedFuelingMissionsOutput - The return type for the personalizedFuelingMissions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFuelingMissionsInputSchema = z.object({
  userId: z.string().describe('The unique identifier for the user.'),
  averageMonthlyLiters: z
    .number()
    .describe('User\'s average monthly fuel consumption in liters.'),
  lastFuelingDate: z.string().describe('Date of the user\'s last fueling (e.g., "YYYY-MM-DD").'),
  fuelingFrequencyDays: z
    .number()
    .describe('Average number of days between user\'s fuelings.'),
  preferredFuelingDays: z
    .array(z.string())
    .describe('Preferred days of the week for fueling (e.g., ["Monday", "Friday"]).'),
  preferredFuelingTimes: z
    .array(z.string())
    .describe('Preferred general times of day for fueling (e.g., ["morning", "evening"]).'),
  currentLoyaltyPoints: z.number().describe('User\'s current loyalty points balance.'),
  completedMissionsCount: z.number().describe('Number of missions the user has completed so far.'),
});
export type PersonalizedFuelingMissionsInput = z.infer<
  typeof PersonalizedFuelingMissionsInputSchema
>;

const PersonalizedFuelingMissionsOutputSchema = z.object({
  missionName: z.string().describe('A catchy and motivating name for the mission.'),
  description: z.string().describe('A detailed description of the mission, including how to complete it.'),
  goalType: z.enum(['liters', 'frequency', 'amount'])
    .describe('The type of goal for the mission (e.g., \'liters\', \'frequency\', \'amount\').'),
  goalValue: z.number().describe('The target value for the goal (e.g., 100 liters, 4 fuelings, 200 currency units).'),
  rewardPoints: z.number().describe('The number of loyalty points awarded upon successful completion of the mission.'),
  expirationDate: z.string().describe('The date by which the mission must be completed (e.g., "YYYY-MM-DD").'),
  psychologicalBiasApplied: z.array(z.enum(['loss aversion', 'endowed progress']))
    .describe('Psychological biases applied to this mission to maximize engagement.'),
  currentProgressText: z.string().optional().describe('Optional: Text indicating initial progress for missions utilizing the \'endowed progress\' bias.'),
});
export type PersonalizedFuelingMissionsOutput = z.infer<
  typeof PersonalizedFuelingMissionsOutputSchema
>;

export async function personalizedFuelingMissions(
  input: PersonalizedFuelingMissionsInput
): Promise<PersonalizedFuelingMissionsOutput> {
  return personalizedFuelingMissionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFuelingMissionsPrompt',
  input: {schema: PersonalizedFuelingMissionsInputSchema},
  output: {schema: PersonalizedFuelingMissionsOutputSchema},
  prompt: `You are an expert gamification designer for a fuel loyalty program named Oktano. Your task is to create a highly personalized and engaging fueling mission for a user, designed to motivate them towards specific fuel-saving goals and earning more rewards. You must apply cognitive psychology biases like 'loss aversion' and 'endowed progress' to maximize engagement and retention. Ensure the mission feels achievable yet challenging.

Here is the user's data:
- User ID: {{{userId}}}
- Average Monthly Liters: {{{averageMonthlyLiters}}} liters
- Last Fueling Date: {{{lastFuelingDate}}}
- Fueling Frequency: Every {{{fuelingFrequencyDays}}} days
- Preferred Fueling Days: {{{preferredFuelingDays}}}
- Preferred Fueling Times: {{{preferredFuelingTimes}}}
- Current Loyalty Points: {{{currentLoyaltyPoints}}}
- Completed Missions: {{{completedMissionsCount}}} missions

Based on this information, design ONE mission that incorporates 'loss aversion' by emphasizing potential rewards that could be missed, and 'endowed progress' by framing the mission with an immediate sense of advancement. The mission should be relevant to their driving habits.

Consider proposing a goal slightly above their average habits to encourage incremental improvement.

The mission should have:
- A catchy 'missionName'.
- A compelling 'description' detailing the mission and its benefits.
- A 'goalType' (e.g., 'liters', 'frequency', 'amount').
- A 'goalValue' based on their habits.
- A generous 'rewardPoints' (e.g., 10% of their current points as a bonus for challenge or a fixed significant amount).
- An 'expirationDate' within the next 30 days.
- Set 'psychologicalBiasApplied' to include both 'loss aversion' and 'endowed progress'.
- A 'currentProgressText' that provides an initial boost feeling (e.g., "You've already made great progress towards your 100-liter goal, with 20 liters fueled this month!"). Make sure this text is plausible relative to the goalValue.`,
});

const personalizedFuelingMissionsFlow = ai.defineFlow(
  {
    name: 'personalizedFuelingMissionsFlow',
    inputSchema: PersonalizedFuelingMissionsInputSchema,
    outputSchema: PersonalizedFuelingMissionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
