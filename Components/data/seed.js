const day = (s) => Date.parse(`${s}T12:00:00Z`);

export const BASE_FOLLOWING = 1264;
export const BASE_FOLLOWERS = 2497;

export const DEFAULT_PROFILE = {
  handle: "Shirin_abdz",
  name: "Shirin",
  bio: "🎯 Classic Creative Artistic Curious Emerging Frontend Developer",
  location: "Iran",
  joined: "June 2020",
  avatar: "/profile.jpg",
  header: "/header.jfif",
};

export const USERS = {
  TaylorSwift: { name: "Taylor Swift", avatar: "/profile/taylor.webp" },
  alex_baldwin: { name: "Alex Baldwin", avatar: "/profile/boy.webp" },
  emma_smith: { name: "emma_smith", avatar: "/profile/girl.jpg" },
  michael_jones: { name: "michael_jones", avatar: "/profile/curly.jpg" },
  olivia_perez: { name: "olivia_perez", avatar: "/profile/girl2.jpg" },
  william_carter: { name: "william_carter", avatar: "/profile/joker.webp" },
  sophia_anderson: { name: "sophia_anderson", avatar: "/profile/selena.jpg" },
  david_miller: { name: "david_miller", avatar: "/profile/spiderman.jpeg" },
  lily_chen: { name: "lily_chen", avatar: "/profile/harley quinn.jpg" },
  ryan_wilson: { name: "ryan_wilson", avatar: "/profile/Iron-Man-Portrait.jpg" },
  hannah_martin: { name: "hannah_martin", avatar: "/profile/joey.avif" },
  jackson_smith: { name: "Jackson Smith", avatar: "/profile/batman.jpg" },
  BillGates: { name: "Bill Gates", avatar: "/bill.jpg" },
  elonmusk: { name: "Elon Musk", avatar: "/elon.webp" },
  finkd: { name: "Zuckerberg", avatar: "/mark.jfif" },
};

export const SUGGESTED = ["BillGates", "elonmusk", "finkd"];

export const SEED_TWEETS = [
  {
    id: "seed-001",
    author: "TaylorSwift",
    text: "Exploring new ideas and pushing boundaries today. 🚀 Innovation never takes a day off! #Innovation #CreativityFlow 🌟",
    createdAt: day("2024-02-20"),
    likes: 1280,
    retweets: 214,
  },
  {
    id: "seed-002",
    author: "alex_baldwin",
    text: "Just enjoying the weekend vibes! 🌈 Whether it's conquering goals or indulging in self-care, make every moment count. #WeekendVibes #PositiveEnergy ✨",
    createdAt: day("2024-02-05"),
    likes: 87,
    retweets: 12,
  },
  {
    id: "seed-003",
    author: "emma_smith",
    text: "New day, new opportunities! 💪 Excited to tackle the challenges ahead and embrace the journey. #MotivationMonday #NewBeginnings 🚀",
    createdAt: day("2024-02-06"),
    likes: 342,
    retweets: 40,
  },
  {
    id: "seed-004",
    author: "michael_jones",
    text: "Reflecting on the simple joys of life today. Sometimes it's the little things that make the biggest impact. #Gratitude #SimpleJoys 🌼",
    createdAt: day("2024-02-07"),
    likes: 56,
    retweets: 5,
  },
  {
    id: "seed-005",
    author: "olivia_perez",
    text: "Sending positive vibes your way! 🌟 Remember, you've got the strength to overcome any obstacle. #StayPositive #YouGotThis 💪",
    createdAt: day("2024-02-08"),
    likes: 410,
    retweets: 63,
  },
  {
    id: "seed-006",
    author: "william_carter",
    text: "Exciting projects in the works! 🔥 Can't wait to share the results with everyone. Stay tuned for updates! #WorkInProgress #ExcitingTimes 🚀",
    createdAt: day("2024-02-09"),
    likes: 129,
    retweets: 18,
  },
  {
    id: "seed-007",
    author: "sophia_anderson",
    text: "Taking a moment to appreciate nature's beauty. 🌿 Grateful for the serenity it brings. #NatureLover #Gratitude 🍃",
    createdAt: day("2024-02-10"),
    likes: 233,
    retweets: 29,
  },
  {
    id: "seed-008",
    author: "david_miller",
    text: "Monday hustle in full swing! 💼 Ready to tackle the week with determination and a positive mindset. #MondayMotivation #HustleHard 💪",
    createdAt: day("2024-02-12"),
    likes: 74,
    retweets: 9,
  },
  {
    id: "seed-009",
    author: "lily_chen",
    text: "Celebrating small victories today! 🎉 It's important to acknowledge and appreciate progress, no matter how small. #SmallWins #CelebrationTime 🙌",
    createdAt: day("2024-02-13"),
    likes: 198,
    retweets: 21,
  },
  {
    id: "seed-010",
    author: "ryan_wilson",
    text: "Chasing dreams and making them a reality. 💫 Never underestimate the power of persistence and passion. #DreamChaser #PersistencePaysOff ✨",
    createdAt: day("2024-02-15"),
    likes: 301,
    retweets: 47,
  },
  {
    id: "seed-011",
    author: "hannah_martin",
    text: "A cup of coffee and a good book – perfect way to unwind. ☕️📖 What's your go-to relaxation method? #SelfCare #ChillTime 😌",
    createdAt: day("2024-02-17"),
    likes: 162,
    retweets: 15,
  },
  {
    id: "seed-012",
    author: "jackson_smith",
    text: "Feeling grateful for the support and love from friends and family. 💖 It truly makes a difference. #Gratitude #FamilyLove 🙏",
    createdAt: day("2024-02-19"),
    likes: 95,
    retweets: 7,
  },
].sort((a, b) => b.createdAt - a.createdAt);
