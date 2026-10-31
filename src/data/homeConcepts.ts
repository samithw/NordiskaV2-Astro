export const homeConcepts = [
 { visible:true, slug:'original-design', name:'Original Design', description:'The original homepage direction: a Nordic landscape opening, expanding service cards and the original Nordiska Advantage.', hero:'original', legacy:null },
 { visible:true, slug:'immersive-photography', name:'Immersive Photography', description:'A photography-led opening with fullscreen images and expanding service cards.', hero:'photography', legacy:'hero' },
 { visible:false, slug:'service-explorer', name:'Service Explorer', description:'An interactive orbit with direct routes into Nordiska’s services and industries.', hero:'signal', legacy:'signal' },
 { visible:false, slug:'expertise-in-motion', name:'Expertise in Motion', description:'A detailed introduction to Nordiska’s capabilities, combining moving imagery with practical explanations.', hero:'story', legacy:'signal-story' },
 { visible:false, slug:'brand-highlights', name:'Brand Highlights', description:'A concise introduction through four themes: opportunity, connections, progress and expertise.', hero:'highlights', legacy:'signal-highlights' },
 { visible:true, slug:'the-nordiska-story', name:'The Nordiska Story', description:'One connected story, from Nordic innovation to international opportunity and practical progress.', hero:'narrative', legacy:'signal-narrative' },
 { visible:true, slug:'cleantech-growth', name:'Cleantech Growth', description:'A direct introduction to Nordiska’s role in helping cleantech companies grow internationally.', hero:'focused', legacy:'signal-focused' },
] as const;
export type HomeConcept = typeof homeConcepts[number];

/** Client-facing shortlist; hidden concepts retain their direct URLs. */
export const visibleHomeConcepts = homeConcepts.filter(concept => concept.visible);
