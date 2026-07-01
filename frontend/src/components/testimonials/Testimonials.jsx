import React, { useState } from 'react';
import './testimonials.css';

const Testimonials = () => {
    const [activeCard, setActiveCard] = useState(null);

    const testimonialsData = [
        {
            id: 1,
            name: "Narendra Shah",
            position: "Software Engineer",
            message:
                "The well-structured curriculum and practical exercises completely transformed my coding journey. I secured my first tech role just weeks after completing the program!",
            image:
                "https://i.pravatar.cc/150?img=11",
        },
        {
            id: 2,
            name: "Priya Sharma",
            position: "Data Science Student",
            message:
                "I appreciate how complex topics are broken down into bite-sized, digestible lessons. The hands-on projects gave me the confidence to tackle real-world problems.",
            image:
                "https://i.pravatar.cc/150?img=5",
        },
        {
            id: 3,
            name: "Michael Chen",
            position: "Freelance Designer",
            message:
                "An incredible learning experience from start to finish. The instructors are clearly experts in their fields, and the community support is unparalleled.",
            image:
                "https://i.pravatar.cc/150?img=8",
        },
        {
            id: 4,
            name: "Sarah Williams",
            position: "Marketing Analyst",
            message:
                "The platform is incredibly user-friendly, and the pacing is perfect for busy professionals. I was able to upskill on my own schedule without feeling overwhelmed.",
            image:
                "https://i.pravatar.cc/150?img=43",
        },
        {
            id: 5,
            name: "David Garcia",
            position: "College Student",
            message:
                "Easily the best investment I've made in my education. The interactive quizzes reinforced my learning, and the lifetime access means I can always review concepts.",
            image:
                "https://i.pravatar.cc/150?img=12",
        },
        {
            id: 6,
            name: "Emily Clark",
            position: "UX Researcher",
            message:
                "A phenomenal resource! The insights I gained here helped me land a promotion. The material is consistently updated and highly relevant.",
            image:
                "https://i.pravatar.cc/150?img=32",
        },
        {
            id: 7,
            name: "James Wilson",
            position: "Entrepreneur",
            message:
                "These courses gave me the exact skills I needed to launch my startup. It's rare to find such high-quality instruction all in one place.",
            image:
                "https://i.pravatar.cc/150?img=53",
        },
    ];

    return (
        <section className="testimonials">
            <h2>What our Students Say?</h2>
            <div className="testimonials-cards">
                {
                    testimonialsData.map((e) => (
                        <div 
                            className={`testimonial-card ${activeCard === e.id ? 'wavy-border' : ''}`} 
                            key={e.id}
                            onClick={() => setActiveCard(activeCard === e.id ? null : e.id)}
                        >
                            <div className="student-img">
                                <img src={e.image} alt="" />
                            </div>
                            <p className="message">{e.message}</p>
                            <div className="info">
                                <p className="name">
                                    {e.name}
                                </p>
                                <p className="position">{e.position}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Testimonials;