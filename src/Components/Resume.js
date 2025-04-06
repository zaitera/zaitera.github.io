import React, {Component} from 'react';
import ReactGA from "react-ga4";

class Resume extends Component {
    render() {
        const sendEvent = function (actiontxt, labeltxt) {
            ReactGA.event({
                category: 'click',
                action: actiontxt,
                label: labeltxt
            });
        };
        if (this.props.data) {
            var skillmessage = this.props.data.skillmessage;

            var work = this.props.data.work.map(function (work) {
                return <div key={work.company}><h3><a href={work.link} target="_blank" rel="noopener noreferrer"
                                                      onClick={() => {
                                                          sendEvent('Accessed \'' + work.company + '\'s website', 'Went to external website')
                                                      }}>{work.company} </a></h3>
                    <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
                    <p>{work.description}</p>
                </div>
            })

            var education = this.props.data.education.map(function (education) {
                return <div key={education.school}><h3><a href={education.link} target="_blank"
                                                          rel="noopener noreferrer" onClick={() => {
                    sendEvent('Accessed \'' + education.school + '\'s website', 'Went to external website')
                }}>{education.school} </a></h3>
                    <p className="info">{education.degree}<em className="date">{education.graduated}</em></p>
                    <p>{education.description}</p></div>
            })

            var experience = (this.props.data?.experience || []).map(function (experience) {
                return <div key={experience.company}><h3><a href={experience.link} target="_blank"
                                                            rel="noopener noreferrer" onClick={() => {
                    sendEvent('Accessed \'' + experience.company + '\'s website', 'Went to external website')
                }}>{experience.company}</a></h3>
                    <p className="info">{experience.title}<span>&bull;</span> <em
                        className="date">{experience.years}</em></p>
                    <p>{experience.description}</p>
                </div>
            })

            var awardsAndPubs = this.props.data.awardsAndPubs.map(function (awardsAndPubs) {
                return <div key={awardsAndPubs.company}><h3><a href={awardsAndPubs.link} target="_blank"
                                                               rel="noopener noreferrer" onClick={() => {
                    sendEvent('Accessed \'' + awardsAndPubs.company + '\'s website', 'Went to external website')
                }}>{awardsAndPubs.company}</a></h3>
                    <p className="info">{awardsAndPubs.title}<span>&bull;</span> <em
                        className="date">{awardsAndPubs.years}</em></p>
                    <p>{awardsAndPubs.description}</p>
                </div>
            })


            var skills = this.props.data.skills.map(function (skills) {
                var className = 'bar-expand ' + skills.name.toLowerCase();
                return <li key={skills.name}><span style={{width: skills.level}}
                                                   className={className}></span><em>{skills.name}</em></li>
            })
            var progs = this.props.data.progs.map(function (progs) {
                var className = 'bar-expand ' + progs.name.toLowerCase();
                return <li key={progs.name}><span style={{width: progs.level}}
                                                  className={className}></span><em>{progs.name}</em></li>
            })

            var libsAndFrameworks = this.props.data.libsAndFrameworks.map(function (libsAndFrameworks) {
                var className = 'bar-expand ' + libsAndFrameworks.name.toLowerCase();
                return <li key={libsAndFrameworks.name}><span style={{width: libsAndFrameworks.level}}
                                                              className={className}></span><em>{libsAndFrameworks.name}</em>
                </li>
            })
        }

        return (
            <section id="resume">

                <div className="row work">

                    <div className="three columns header-col">
                        <h1><span>Work</span></h1>
                    </div>

                    <div className="nine columns main-col">
                        {work}
                    </div>
                </div>

                <div className="row education">
                    <div className="three columns header-col">
                        <h1><span>Education</span></h1>
                    </div>

                    <div className="nine columns main-col">
                        <div className="row item">
                            <div className="twelve columns">
                                {education}
                            </div>
                        </div>
                    </div>
                </div>


                {(this.props.data?.experience && this.props.data.experience.length > 0) && (
                    <div className="row work">
                        <div className="three columns header-col">
                            <h1><span>Experience</span></h1>
                        </div>

                        <div className="nine columns main-col">
                            {experience}
                        </div>
                    </div>
                )}

                <div className="row work">
                    <div className="three columns header-col">
                        <h4><span>AWARDS & PUBLICATIONS</span></h4>
                    </div>

                    <div className="nine columns main-col">
                        {awardsAndPubs}
                    </div>
                </div>
                <div className="row skill">

                    <div className="three columns header-col">
                        <h1><span>Skills</span></h1>
                    </div>

                    <div className="nine columns main-col">

                        <p>{skillmessage}
                        </p>

                        <div className="bars">
                            <ul className="skills">
                                {skills}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row skill">

                    <div className="three columns header-col">
                        <h4><span>PROGRAMMING</span></h4>
                    </div>

                    <div className="nine columns main-col">
                        <div className="bars">
                            <ul className="skills">
                                {progs}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row skill">

                    <div className="three columns header-col">
                        <h4><span>LIBS & FRAMEWORKS</span></h4>
                    </div>

                    <div className="nine columns main-col">
                        <div className="bars">
                            <ul className="skills">
                                {libsAndFrameworks}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Resume;
