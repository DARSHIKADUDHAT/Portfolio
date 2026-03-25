const DATA = {
  personal: {
    name: 'Darshika Dudhat',
    location: '',
    phone: '+91-7862099008',
    email: 'dudhatdarshika2@gmail.com',
    linkedin: 'https://www.linkedin.com/in/darshika-dudhat-227377284/',
    github: 'https://github.com/DARSHIKADUDHAT',
    objective: '',
    journey: [
      'About me',
      'I am an AI/ML-focused Computer Engineering undergraduate with hands-on experience in building intelligent, data-driven systems and full-stack applications.',
      'My work spans across natural language processing, deep learning, and scalable backend architectures, where I focus on transforming complex real-world challenges into efficient and deployable solutions.'
    ]
  },
  education: [
    {
      title: 'Bachelor of Technology in Computer Engineering',
      school: 'Charotar University of Science and technology (CHARUSAT)',
      details: 'CGPA: 9.0/10',
      year: '2023–2027'
    },
    {
      title: 'Higher Secondary (Class XII)',
      school: 'Ashadeep Science School, GSEB',
      details: '72%',
      year: '2023'
    }
  ],
  skills: {
    '💻 programming': ['C', 'C++', 'Java', 'Python', 'JavaScript'],
    '🌐 web': ['HTML', 'CSS', 'Bootstrap', 'React.js', 'Node.js'],
    '🗄️ database': ['MySQL', 'MongoDB', 'PostgreSQL'],
    '🛠️ tools': ['Git', 'GitHub', 'VS Code', 'NumPy', 'Pandas', 'Matplotlib']
  },
  projects: [
    {
      name: '⚖️ NyayaSetu.AI',
      desc: 'AI-powered legal assistant using NLP and machine learning.',
      tech: ['React', 'Node.js', 'Flask', 'NLP Models', 'REST API'],
      projectLink: 'https://lnkd.in/dPbpu358',
      demo: '#',
      previewStyle: 'preview-glitch',
      btnText: 'Project Link',
      bullets: [
        'Developed an AI-powered legal assistant capable of answering legal queries using NLP and machine learning.',
        'Installed legal document summarization and interpretation of user-uploaded case files.',
        'Built secure backend APIs to deal with legal text processing, query classification, and response retrieval.'
      ]
    },
    {
      name: '🩸 LeukoScan: AI-Powered Leukemia Prediction System',
      status: 'ongoing',
      desc: 'AI-based clinical decision support framework to detect early stages of leukemia.',
      tech: ['PERN Stack', 'Python', 'ML', 'DL'],
      github: 'https://github.com/riyajagani/LeukoScan',
      demo: '#',
      previewStyle: 'preview-particles',
      btnText: 'View Github Repo',
      bullets: [
        'Coded LeukoScan, an artificial intelligence-based clinical decision support framework to detect early stages of leukemia with the help of multi-model ensembles.',
        'Designed secure workflows for biomarker processing and prediction analysis.',
        'Prepared processed real hospital data using superior data cleaning, normalization, feature engineering, and model evaluation.'
      ]
    },
    {
      name: '🎥 Multi-Object Tracking (YOLOv8x + BoT-SORT)',
      desc: 'High-performance multi-object tracking system capable of maintaining consistent object identities across video frames.',
      tech: ['YOLOv8x', 'BoT-SORT', 'Deep Learning'],
      github: 'https://github.com/DARSHIKADUDHAT/Mot_using_YOLOv8x',
      demo: '#',
      previewStyle: 'preview-matrix',
      btnText: 'View Github Repo',
      bullets: [
        'Developed a high-performance multi-object tracking system using YOLOv8x for detection and BoT-SORT for tracking.',
        'Implemented end-to-end pipeline including detection, tracking, and evaluation using MOT metrics (MOTA, MOTP, ID switches) for real-world video analytics applications.'
      ]
    },
    {
      name: '🛰️ Satellite Image Classification (SEN-2 LULC)',
      desc: 'Deep learning-based image classification model to categorize satellite images into multiple land-use classes.',
      tech: ['Deep Learning', 'CNN', 'Python'],
      github: 'https://github.com/DARSHIKADUDHAT/Satellite-Image-Classification-using-Deep-Learning',
      demo: '#',
      previewStyle: 'preview-mesh',
      btnText: 'View Github Repo',
      bullets: [
        'Built a deep learning-based image classification model to categorize satellite images into multiple land-use classes using the SEN-2 LULC dataset.',
        'Designed and trained a CNN architecture with preprocessing and evaluation pipeline, enabling accurate classification for applications in geospatial analysis and environmental monitoring.'
      ]
    }
  ],
  experience: [
    {
      company: 'BrainyBeam Technologies Pvt Ltd',
      role: 'Intern',
      duration: '12 May - 12 June 2025',
      bullets: [
        'Built a Restaurant Management Admin System using Django to streamline order processing and user management.',
        'Designed and implemented backend logic with database integration, improving efficiency.'
      ],
      link: 'https://drive.google.com/file/d/1LFOofGJZzEgu-RxILZfyN8pKV4q0dlEO/view?usp=drive_link',
      btnText: 'Certificate of Completion'
    }
  ],
  research: [
    {
      title: 'Multi-Object Tracking in MOT15 Using YOLOv8x with Enhanced ByteTrack Integration',
      venue: 'International Conference on ICTIS 2026, Thailand',
      date: 'Apr 2026',
      bullets: [
        'Research paper accepted for presentation and publication in Springer LNCS proceedings.',
        'Proposed a deep learning-based multi-object tracking framework using YOLOv8x and enhanced ByteTrack.',
        'Achieved improved tracking performance in terms of MOTA and IDF1 on the MOT15 benchmark.'
      ]
    }
  ],
  certifications: [
    'Theory of Computation (NPTEL)',
    'DSA using Java (NPTEL)',
    'Deep Learning (Coursera)',
    'EDA for ML (Coursera)'
  ],
  achievements: [
    'Participated in university-level technical events, enhancing problem-solving and teamwork skills.',
    'Volunteered at NSS SmileFiesta, contributing to event coordination and community engagement.'
  ],
  languages: ['English (Fluent)', 'Hindi (Fluent)', 'Gujarati (Native)']
}

export default DATA
