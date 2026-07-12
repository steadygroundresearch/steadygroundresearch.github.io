const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const top = section.offsetTop;
      if (pageYOffset >= top - 120) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
   
  const nodeContent = {

  panel: {
  type: 'text',
  title: 'Panel Data',

  body: `
    <h4>1. Where Did the Name “Panel Data” Come From?</h4>
    
    <p>
      Panel data emerged from the need to answer a fundamental question: 
    </p>

    <blockquote>
      How can the same entities be observed over time in order to distinguish 
      permanent differences between them from changes that occur through time?
    </blockquote>

    <p>
      The term <strong>panel</strong> did not actually originate from economics or statistics.
      Its roots lie in sociology and market research during the 1930s and 1940s.
    </p>

    <p>
      A key figure in its development was <strong>Paul Lazarsfeld</strong>, a professor of sociology and founder of the Bureau of Applied Social Research at Columbia University.
      While studying voting behaviour and consumer preferences, Lazarsfeld developed a method of interviewing the exact same group of respondents at regular intervals. 
    </p>

    <p>
      He referred to this group as a <em>panel</em>, borrowing the legal/public term for a selected group of individuals (like a jury panel or a panel of experts).
    </p>

    <p>
      Over time economists adopted the approach and datasets that followed the same units across multiple periods became known as <strong>panel data</strong>.
    </p>

    <h4>2. The Many Names of Panel Data</h4>

    <p>
      Although the underlying data structure is similar, different disciplines use different terminology:
    </p>

    <ul>
      <li><strong>Panel data</strong> – Econometrics and Economics</li>
      <li><strong>Longitudinal Data</strong> – Biostatistics, Epidemiology, and Sociology</li>
      <li><strong>Repeated Measures</strong> – Psychology and Experimental Design</li>
      <li><strong>Cross-Sectional Time Series (or Time-Series Cross-Sectional) Data</strong> – An earlier term widely used in econometrics and 
      still common in political science, comparative analysis and international relations.</li>
    </ul>
  `
   },

  what: {
    type: 'text',
    title: 'What is Panel Data?',
    body: `
      <p>
        Panel data is a dataset that follows the same entities over time. These entities may be individuals, firms, banks, countries, animals, regions,
        or any other unit that is observed repeatedly through time.
      </p>

      <p>
        Because the same entities are observed repeatedly, panel data combines two important dimensions of data analysis:
      </p>
        
      <ol>
        <li>
         The cross-sectional dimension, which captures many entities at a single point in time, and 
        </li>
         
        <li>
         The time series dimension, which follows a single entity across multiple time periods.
        </li>

      </ol>
      
      <p>
        By combining these two dimensions, panel data enables researchers to analyse both differences across entities and changes within entities over time.
      </p>

        <h4>Key feature:</h4>
          <blockquote>
            The defining characteristic of panel data is that the same entities are observed repeatedly across multiple time periods.
          </blockquote>

        <h4>Examples of panel data include:</h4>
      <ul>   
        <li>Annual financial statements of commercial banks over ten years.</li>
        <li>Household income surveys conducted on the same families every year.</li>
        <li>Economic indicators observed for multiple countries over several decades.</li>
        <li>Student performance records tracked throughout their years of schooling.</li>
        <li>Weight measurements of 48 pigs observed over nine successive weeks.</li>
      </ul>
      
       <strong>What Does a Panel Dataset Look Like?</strong>
      <p>
       The figure below illustrates a panel dataset organised in both long and wide formats.<br>
       Click the image to enlarge it.
      </p>

       <img
        src="resources/panel-data-methods/PanelDataformatInfographic.svg"
        class="zoom-infographic clickable-infographic"
        alt="Long and Wide Panel Data Formats">

        <strong>Reflection:</strong>
        <blockquote>
          There are many more examples of panel datasets than those listed above. 
          Can you think of a few?
        </blockquote>
    `
  },

  why: {
  type: 'infographic',
  title: 'Why Does Panel Data Matter?',
  body: `
  <img
    src="resources/panel-data-methods/PanelDataInfographic.svg"
    class="modal-infographic"
    alt = "Why Panel Data Matters infographic">
    `
  },

  type: {
  type: 'infographic',
  title: 'Types of Panel Data Structures',
  body: `
    <iframe
    src="resources/panel-data-methods/TypesofPanelDataStructures.html"
    style="display:block; width:900px; max-width:100%; height:78vh; border:none; border-radius:8px; margin:0 auto;"
    title = "Types of Panel Data Structures">
    </iframe>
    `
  }

};
  const map = document.getElementById('panel-map');

  map.addEventListener('load', () => {

  const svgDoc = map.contentDocument;
  const nodes = svgDoc.querySelectorAll('.node');

  nodes.forEach(node => {

    node.style.cursor = 'pointer';

    const shape = node.querySelector('path');
    const title = node.querySelector('title')?.textContent;

    node.addEventListener('mouseenter', () => {

      if (shape) {
        shape.style.fill = '#e6f0ff';
        shape.style.stroke = '#0056b3';
        shape.style.strokeWidth = '2px';
      }

    });

    node.addEventListener('mouseleave', () => {

      if (shape) {
        shape.style.fill = '';
        shape.style.stroke = '';
        shape.style.strokeWidth = '';
      }

    });

    node.addEventListener('click', () => {

    const content = nodeContent[title];

      if (content) {

          const modalContent =
          document.querySelector('.node-modal-content');

         modalContent.classList.remove(
            'text-modal',
          'infographic-modal'
    );

      modalContent.classList.add(content.type + '-modal');
      modalTitle.textContent = content.title;
      modalBody.innerHTML = content.body;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
}

   });

  });

});


const modal = document.getElementById('node-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeButton = document.querySelector('.close-modal');


function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

closeButton.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// for infographics re: panel dataset long and wide formats. 

const imageModal = document.getElementById("image-modal");
const expandedImage = document.getElementById("expanded-image");
const closeImage = document.querySelector(".close-image");

document.addEventListener("click", function(e){

    if(e.target.classList.contains("clickable-infographic")){
        expandedImage.src = e.target.src;
        imageModal.classList.add("active");

    }

});

closeImage.addEventListener("click", function(){
    imageModal.classList.remove("active");

});

imageModal.addEventListener("click", function(e){
    if(e.target === imageModal){
        imageModal.classList.remove("active");

    }

});
