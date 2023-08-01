import React from "react";
import "./style/Team.css";
import Banner from "../components/banner/Banner";

const Team = () => {
  const teams = [
    {
      name: "Artjoms Bolsakovs",
      image: "bolsakovs",
      position: "CTO",
      description:
        "Artjoms co-founded the company and has led its development team since then. He has overseen the creation of our in-house reservation system in addition to all of our other systems.",
    },
    {
      name: "Inna Vilenska",
      image: "vilenska",
      position: "CEO",
      description:
        "A seasoned executive, Inna has over a decade of experience leading financial services and tech companies. She now leads our team making use of her certified coaching skills.",
    },
    {
      name: "Dmitrijs Zaznovs",
      image: "zaznovs",
      position: "CMO",
      description:
        "Dmitrijs co-founded the company and has led its marketing team since then. He has been the main driver of our company’s astronomical growth having mastered multiple channels for customer acquisition.",
    },
    {
      name: "Aleksandrs Buraks",
      image: "buraks",
      position: "Head of Growth",
      description:
        "Aleksandrs is responsible for growth marketing. He manages several marketing teams including the SEO, Affiliate Marketing, Content, and Public Relations teams, all of which help propel our company to success.",
    },
    {
      name: "Anastasija Zubenko",
      image: "zubenko",
      position: "Head of Commercial Relationships",
      description:
        "Anastasija's team builds great relationships with our rental partners and works diligently to negotiate the best prices and terms for our customers.",
    },
    {
      name: "Annija Kocina",
      image: "kocina",
      position: "Head of Data Quality",
      description:
        "Annija started as a Customer Service Agent before taking on her current role. Thanks to her insights and experience, Annija and her team are well-equipped to provide clear, accurate and trustworthy information that customers need to rent a car.",
    },
  ];
  return (
    <div className="team-container">
      <Banner title="Our Team" />
      <div className="team-section">
        <section className="header">
          <h3>Our Leaders</h3>
          <p>
            Though some of us were here from the beginning and others joined
            over time, every member of our leadership has been essential to our
            company’s growth.
          </p>
        </section>
        <section className="team-wrapper">
          {teams.map((team, index) => (
            <article key={index} className="team-card">
              <div className="image-container">
                <img
                  src={`../images/teams/${team.image}.png`}
                  alt={team.image}
                />
              </div>
              <h3>{team.name}</h3>
              <h5>{team.position}</h5>
              <p>{team.description}</p>
            </article>
          ))}
        </section>
      </div>
      <div className="team-section">
        <section className="header">
          <h3>Meet Our Partners</h3>
          <p>Our deals can be found on these leading travel search engines.</p>
        </section>
        <section className="partners">
          <img src="../images/teams/partners/Kayak-Logo.png" alt="Kayak" />
          <img
            src="../images/teams/partners/Skyscanner-Logo.png"
            alt="Skyscanner"
          />
          <img src="../images/teams/partners/Liligo-Logo.png" alt="Liligo" />
          <img src="../images/teams/partners/Jetcost-Logo.png" alt="Jetcost" />
          <img src="../images/teams/partners/Travel-Logo.png" alt="Kayak" />
        </section>
      </div>
    </div>
  );
};

export default Team;
