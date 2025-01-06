import { availableMemory } from "process";

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Prep AI",
      features: "Features",
      findExperts: "Find Experts",
      becomeExpert: "Become an Expert",
      talents: "Join Talents community",
      signIn: "Sign In",
      getStarted: "Get Started",
    },
    // Hero section
    hero: {
      beta: "Now in Beta - Join Today",
      title: "Learn from Expert Developers in Real-Time",
      subtitle:
        "Connect with experienced developers for personalized 1-on-1 sessions, code reviews, and career guidance",
      findExpert: "Find an Expert",
      viewDemo: "View Demo",
      stats: {
        experts: "Expert Mentors",
        sessions: "Sessions Completed",
        rating: "Average Rating",
      },
    },
    // Features section
    features: {
      title: "Why Choose BalafondDreams aka Prep AI",
      subtitle: "Everything you need to accelerate your learning journey",
      live: {
        title: "Live Sessions",
        description:
          "Get real-time help with your code through interactive pair programming",
      },
      video: {
        title: "Video Consultations",
        description:
          "Face-to-face mentoring sessions with screen sharing capabilities",
      },
      learning: {
        title: "Custom Learning Paths",
        description:
          "Personalized guidance based on your skill level and goals",
      },
    },
    // Experts section
    experts: {
      title: "Meet Our Top Experts",
      subtitle: "Learn from industry professionals with years of experience",
      viewProfile: "View Profile",
      sessions: "sessions",
    },
    // error page aka waiting list
    error:{
      available: "Available soon",
      join: "Join the waiting list to be among the first to benefit from sessions personalized learning sessions with experienced developers.",
      us: "Thanks for subscribing",
      intouch: "We will keep you informed of the launch of the platform.",
      waiting: "Join the waiting list"
    },
    // Auth forms
    login: {
      form: {
        welcome: "Welcome Back!",
        loginMessage: "Login to your account to continue learning",
      },
      subtitle: "Enter your credentials to access your account",
      email: "Email",
      password: "Password",
      submit: "Login",
    },
    auth: {
      signin: {
        title: "Sign In",
        subtitle: "Enter your credentials to access your account",
        email: "Email",
        emailPlaceholder: "m@example.com",
        password: "Password",
        submit: "Login",
        continueWith: "Or continue with",
      },
      forgotPassword: {
        question: "Forgot your password?",
        title: "Forgot Password",
        subtitle: "Enter your email to reset your password",
        email: "Email",
        submit: "Reset Password",
      },
      signup: {
        title: "Create an Account",
        subtitle: "Join our community to start learning",
        firstName: "First Name",
        NamePlaceholder: "Mr. Example",
        lastName: "Last Name",
        rolePurpose: "I want to",
        email: "Email",
        emailPlaceholder: "m@example.in",
        password: "Password",
        submit: "Create Account",
      },
    },
    // Expert application
    expertForm: {
      title: "Join Our Expert Community",
      subtitle:
        "Share your expertise and help others grow while building your professional network",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      expertise: "Primary Expertise",
      experience: "Years of Experience",
      bio: "Professional Bio",
      bioPlaceholder:
        "Tell us about your experience and what makes you a great mentor",
      cv: "Upload CV/Resume",
      submit: "Submit Application",
    },
    talent: {
      title: "Join Our Talents Community",
      subtitle:
        "Being registered as a talent will allow you to connect with other professionals in the industry",
      formTitle: "Join Our Talents Community",
      formDescription:
        "Share your skills and connect with other professionals in the industry",
      formPersoInfo: "Personal Information",
      formFirstName: "First Name",
      formLastName: "Last Name",
      formEmail: "Email",
      formProfessinalInfo: "Professional Information",
      formExperienceYear: "Years of Experience",
      formPrimaryExpertise: "Primary Expertise",
      formSkills: "Skills",
      formAddSkill: "Add Skill",
      formBio: "Professional Bio",
      formBioPlaceholder:
        "Tell us about your experience and what you're looking to achieve",
      formSubmit: "Submit Application",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      skills: "Skills",
      addSkill: "Add Skill",
      experience: "Years of Experience",
      bio: "Professional Bio",
      bioPlaceholder:
        "Tell us about your experience and what you're looking to achieve",
      submit: "Submit Application",
      formSubmitting: "Sending...",
      submitSuccess: "Well received",
      submitSuccessMessage: "Thanks for sharing, we'll revert back to you asap",
      submitError: "Something went wrong",
      submitErrorMessage: "Sorry, we've not been able to process it",
      selectExperience: "Select years of experience",
      selectExpertise: "Select your primary expertise",
      enterSkill: "Add a skill (e.g., React, Node.js)",
      formProfessionnalResume: "Upload your Resume",
      skilltooltips: "Press Enter or comma to add a skill",
    },
    experience: {
      junior: "Junior",
      intermediate: "Intermediate",
      senior: "Senior",
      expert: "Expert",
    },
    expertise: {
      frontend: "Frontend Development",
      backend: "Backend Development",
      fullstack: "Full Stack Development",
      mobile: "Mobile Development",
      devops: "DevOps Development",
      network: "Network Development",
      security: "Security",
    },
  },
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      features: "Fonctionnalités",
      findExperts: "Trouver un Expert",
      becomeExpert: "Devenir Expert",
      signIn: "Se Connecter",
      getStarted: "Commencer",
    },
    // Hero section
    hero: {
      beta: "Maintenant en Bêta - Rejoignez-nous",
      title: "Apprenez avec des Développeurs Experts en Temps Réel",
      subtitle:
        "Connectez-vous avec des développeurs expérimentés pour des sessions personnalisées, des revues de code et des conseils de carrière",
      findExpert: "Trouver un Expert",
      viewDemo: "Voir la Démo",
      stats: {
        experts: "Experts Mentors",
        sessions: "Sessions Réalisées",
        rating: "Note Moyenne",
      },
    },
    // Features section
    features: {
      title: "Pourquoi Choisir Prep AI",
      subtitle:
        "Tout ce dont vous avez besoin pour accélérer votre apprentissage",
      live: {
        title: "Sessions de Code en Direct",
        description:
          "Obtenez de l'aide en temps réel avec votre code via la programmation en binôme",
      },
      video: {
        title: "Consultations Vidéo",
        description: "Sessions de mentorat en face à face avec partage d'écran",
      },
      learning: {
        title: "Parcours Personnalisés",
        description:
          "Conseils personnalisés selon votre niveau et vos objectifs",
      },
    },
    // Experts section
    experts: {
      title: "Rencontrez Nos Meilleurs Experts",
      subtitle: "Apprenez avec des professionnels expérimentés du secteur",
      viewProfile: "Voir le Profil",
      sessions: "sessions",
    },
    // Auth forms
    auth: {
      signin: {
        title: "Connexion",
        subtitle: "Entrez vos identifiants pour accéder à votre compte",
        email: "Email",
        password: "Mot de passe",
        submit: "Se Connecter",
      },
      signup: {
        title: "Créer un Compte",
        subtitle: "Rejoignez notre communauté pour commencer à apprendre",
        firstName: "Prénom",
        lastName: "Nom",
        email: "Email",
        password: "Mot de passe",
        submit: "Créer un Compte",
      },
    },
    // Expert application
    expertForm: {
      title: "Rejoignez Notre Communauté d'Experts",
      subtitle:
        "Partagez votre expertise et aidez les autres à progresser tout en développant votre réseau professionnel",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      expertise: "Expertise Principale",
      experience: "Années d'Expérience",
      bio: "Bio Professionnelle",
      bioPlaceholder:
        "Parlez-nous de votre expérience et de ce qui fait de vous un excellent mentor",
      cv: "Télécharger CV",
      submit: "Soumettre la Candidature",
    },
  },
};
