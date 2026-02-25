export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  owner: string;
  company: string;
  title: string;
  summary: string;
  initials: string;
}

export const MOCK_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Brian Halligan (Sample Contact)',
    email: 'bh@hubspot.com',
    phone: '--',
    owner: 'No owner',
    company: 'HubSpot',
    title: 'Executive Chairperson at HubSpot',
    initials: 'BH',
    summary: 'The most recent activity is a meeting scheduled for February 22, 2026, where the contact expressed enthusiasm about touring the cupcake factory. Prior to that, there was a call on February 19, 2026, with Brian Halligan discussing interest in the cupcake options and setting up a meeting next week.'
  },
  {
    id: '2',
    name: 'Maria Johnson (Sample Contact)',
    email: 'emailmaria@hubspot.com',
    phone: '--',
    owner: 'No owner',
    company: 'HubSpot',
    title: 'Marketing Manager at HubSpot',
    initials: 'MJ',
    summary: 'Maria is interested in our new lead generation tools. She requested a demo for her team next Tuesday. She mentioned they are currently looking to replace their existing legacy system.'
  }
];
