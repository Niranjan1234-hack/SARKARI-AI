// DOM Elements
const form = document.getElementById('applicationForm');
const previewSection = document.getElementById('documentPreview');
const downloadBtn = document.getElementById('downloadPdf');
const translateBtn = document.getElementById('translateBtn');
const aiEnhanceBtn = document.getElementById('aiEnhanceBtn');
const detailsTextarea = document.getElementById('details');
const purposeInput = document.getElementById('purpose');
const departmentSelect = document.getElementById('department');

// Auto-suggestions for common purposes by department
const purposeSuggestions = {
    'revenue': [
        'കുടുംബ ഭവനത്തിനുള്ള സർട്ടിഫിക്കറ്റ്',
        'വരുമാന സർട്ടിഫിക്കറ്റ്',
        'ജാതി സർട്ടിഫിക്കറ്റ്',
        'വസതി സർട്ടിഫിക്കറ്റ്',
        'നിലവിലെ സർട്ടിഫിക്കറ്റ്',
        'വിലാസ സർട്ടിഫിക്കറ്റ്'
    ],
    'police': [
        'പോലീസ് ക്ലിയറൻസ് സർട്ടിഫിക്കറ്റ്',
        'അപരാധ രഹിത സർട്ടിഫിക്കറ്റ്',
        'വിദേശ യാത്രയ്ക്കുള്ള സർട്ടിഫിക്കറ്റ്',
        'വാഹന ലൈസൻസ് സർട്ടിഫിക്കറ്റ്',
        'അടിയന്തര സേവന സർട്ടിഫിക്കറ്റ്'
    ],
    'education': [
        'വിദ്യാഭ്യാസ സർട്ടിഫിക്കറ്റ്',
        'സ്കൂൾ ട്രാൻസ്ഫർ സർട്ടിഫിക്കറ്റ്',
        'ബിരുദ സർട്ടിഫിക്കറ്റ്',
        'വിദ്യാഭ്യാസ യോഗ്യതാ സർട്ടിഫിക്കറ്റ്',
        'സ്കോളർഷിപ്പ് അപേക്ഷ'
    ],
    'health': [
        'ആരോഗ്യ സർട്ടിഫിക്കറ്റ്',
        'വൈകല്യ സർട്ടിഫിക്കറ്റ്',
        'ആരോഗ്യ ഇൻഷുറൻസ്',
        'ആശുപത്രി ചികിത്സാ സർട്ടിഫിക്കറ്റ്',
        'ആരോഗ്യ റിപ്പോർട്ട്'
    ],
    'pwd': [
        'റോഡ് പരിപാലന അപേക്ഷ',
        'പാലം നിർമ്മാണ അപേക്ഷ',
        'ജലസേചന സംവിധാനം',
        'പൊതു സൗകര്യങ്ങൾ',
        'ഇൻഫ്രാസ്ട്രക്ചർ അപേക്ഷ'
    ]
};

// Department details mapping
const departmentDetails = {
    'revenue': {
        name: 'റവന്യൂ വകുപ്പ്',
        address: 'റവന്യൂ വകുപ്പ്, തിരുവനന്തപുരം, കേരളം - 695033',
        contact: 'ഫോൺ: 0471-2320011, ഇമെയിൽ: revenue@kerala.gov.in'
    },
    'police': {
        name: 'പോലീസ് വകുപ്പ്',
        address: 'പോലീസ് ഹെഡ് ക്വാട്ടേഴ്സ്, തിരുവനന്തപുരം, കേരളം - 695010',
        contact: 'ഫോൺ: 0471-2722500, ഇമെയിൽ: keralapolice@kerala.gov.in'
    },
    'education': {
        name: 'വിദ്യാഭ്യാസ വകുപ്പ്',
        address: 'വിദ്യാഭവൻ, തിരുവനന്തപുരം, കേരളം - 695033',
        contact: 'ഫോൺ: 0471-2325300, ഇമെയിൽ: education@kerala.gov.in'
    },
    'health': {
        name: 'ആരോഗ്യ വകുപ്പ്',
        address: 'സ്വാസ്ഥ്യഭവൻ, തിരുവനന്തപുരം, കേരളം - 695035',
        contact: 'ഫോൺ: 0471-2302784, ഇമെയിൽ: health@kerala.gov.in'
    },
    'pwd': {
        name: 'പൊതുമരാമത്ത് വകുപ്പ് (PWD)',
        address: 'പി.ഡബ്ല്യു.ഡി. ഹെഡ് ഓഫീസ്, തിരുവനന്തപുരം, കേരളം - 695033',
        contact: 'ഫോൺ: 0471-2327211, ഇമെയിൽ: pwd@kerala.gov.in'
    },
    'other': {
        name: 'സംബന്ധിച്ച വകുപ്പ്',
        address: 'വകുപ്പ് വിലാസം',
        contact: 'ഫോൺ: XXXXXXX, ഇമെയിൽ: example@kerala.gov.in'
    }
};

// Current date in Malayalam
function getCurrentDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('ml-IN', options);
}

// Format the application number
function generateApplicationNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `APP/${year}/${randomNum}`;
}

// Format text with proper line breaks
function formatText(text) {
    // Replace double spaces with single space
    text = text.replace(/\s+/g, ' ');
    // Add line breaks after sentences for better readability
    text = text.replace(/\. /g, '.<br>');
    return text;
}

// Generate the formal document
function generateDocument(formData) {
    const dept = departmentDetails[formData.department] || departmentDetails['other'];
    const appNumber = generateApplicationNumber();
    const currentDate = getCurrentDate();
    const formattedDetails = formatText(formData.details);

    return `
        <div class="document" style="font-family: 'Noto Sans Malayalam', sans-serif; line-height: 1.8; color: #333;">
            <div style="text-align: center; margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 3px solid #1e3a8a;">
                <h2 style="color: #1e3a8a; font-size: 1.75rem; margin-bottom: 0.75rem; font-weight: 700;">${dept.name}</h2>
                <p style="margin-bottom: 0.5rem; font-size: 1rem;">${dept.address}</p>
                <p style="margin-bottom: 1.5rem; font-size: 0.95rem; color: #555;">${dept.contact}</p>
                <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 2px solid #e5e7eb;">
                    <p style="font-weight: 600; margin-bottom: 0.5rem; font-size: 1rem;">അപേക്ഷാ നമ്പർ: <span style="color: #1e3a8a;">${appNumber}</span></p>
                    <p style="font-size: 0.95rem; color: #666;">തീയതി: ${currentDate}</p>
                </div>
            </div>

            <div style="margin-bottom: 2rem;">
                <h3 style="color: #1e3a8a; font-size: 1.1rem; margin-bottom: 0.75rem; font-weight: 600; border-left: 4px solid #1e3a8a; padding-left: 0.75rem;">
                    വിഷയം: ${formData.purpose}
                </h3>
            </div>

            <div style="margin-bottom: 2.5rem; padding: 1.25rem; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <p style="font-weight: 600; margin-bottom: 1rem; color: #1e3a8a; font-size: 1.05rem;">പരിചയക്കുറിപ്പ്</p>
                <p style="text-align: justify; line-height: 1.9; font-size: 1rem;">${formattedDetails}</p>
            </div>

            <div style="margin-bottom: 2.5rem; padding: 1.25rem; background-color: #fef3c7; border-radius: 8px; border: 1px solid #fbbf24;">
                <p style="font-weight: 600; margin-bottom: 1rem; color: #92400e; font-size: 1.05rem;">അപേക്ഷകന്റെ വിശദാംശങ്ങൾ:</p>
                <div style="line-height: 2;">
                    <p style="margin-bottom: 0.5rem;"><strong>പേര്:</strong> ${formData.name}</p>
                    <p style="margin-bottom: 0.5rem;"><strong>വിലാസം:</strong> ${formData.address}</p>
                    <p style="margin-bottom: 0.5rem;"><strong>മൊബൈൽ നമ്പർ:</strong> ${formData.mobile}</p>
                    ${formData.email ? `<p style="margin-bottom: 0.5rem;"><strong>ഇമെയിൽ:</strong> ${formData.email}</p>` : ''}
                </div>
            </div>

            <div style="margin-top: 3.5rem; text-align: right; padding-top: 2rem; border-top: 2px solid #e5e7eb;">
                <p style="margin-bottom: 1.5rem; line-height: 1.8;">
                    നിങ്ങളുടെ വിശ്വസ്തനായ,<br>
                    <strong style="font-size: 1.1rem; color: #1e3a8a;">${formData.name}</strong>
                </p>
                <div style="margin-top: 2rem;">
                    <p style="margin-bottom: 0.5rem; color: #666; font-size: 0.9rem;">(ഒപ്പ്)</p>
                    <p style="font-weight: 500;">${formData.name}</p>
                </div>
            </div>
        </div>
    `;
}

// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        department: document.getElementById('department').value,
        purpose: document.getElementById('purpose').value,
        details: document.getElementById('details').value,
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        mobile: document.getElementById('mobile').value,
        email: document.getElementById('email').value
    };
    
    // Generate and display the document
    const documentHtml = generateDocument(formData);
    previewSection.innerHTML = documentHtml;
    
    // Enable download button
    downloadBtn.disabled = false;
    
    // Scroll to preview
    previewSection.scrollIntoView({ behavior: 'smooth' });
});

// Handle PDF download
downloadBtn.addEventListener('click', async function() {
    const content = document.querySelector('.document');
    
    if (!content) {
        alert('ദയവായി ആദ്യം അപേക്ഷ സൃഷ്ടിക്കുക');
        return;
    }
    
    // Disable button during PDF generation
    downloadBtn.disabled = true;
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = 'PDF സൃഷ്ടിക്കുന്നു...';
    
    try {
        // Check if html2canvas is available
        if (typeof html2canvas === 'undefined') {
            // Fallback to jsPDF html method
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4');
            
            await doc.html(content, {
                callback: function(doc) {
                    const now = new Date();
                    const dateStr = now.toISOString().split('T')[0];
                    const filename = `sarkari_ai_application_${dateStr}.pdf`;
                    doc.save(filename);
                    downloadBtn.disabled = false;
                    downloadBtn.textContent = originalText;
                },
                x: 10,
                y: 10,
                width: 190,
                windowWidth: 800,
                margin: [10, 10, 10, 10],
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    logging: false
                }
            });
        } else {
            // Use html2canvas for better rendering
            const canvas = await html2canvas(content, {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                logging: false,
                backgroundColor: '#ffffff'
            });
            
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4');
            
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            
            // Add first page
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            // Add additional pages if needed
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            // Generate filename with date
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const filename = `sarkari_ai_application_${dateStr}.pdf`;
            
            // Save the PDF
            doc.save(filename);
            
            // Re-enable button
            downloadBtn.disabled = false;
            downloadBtn.textContent = originalText;
        }
    } catch (error) {
        console.error('PDF generation error:', error);
        alert('PDF സൃഷ്ടിക്കുന്നതിൽ പിശക് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.');
        downloadBtn.disabled = false;
        downloadBtn.textContent = originalText;
    }
});

// Add input validation
const mobileInput = document.getElementById('mobile');
mobileInput.addEventListener('input', function(e) {
    // Remove any non-digit characters
    this.value = this.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});

// Generate and display family code
function generateFamilyCode() {
    const prefix = 'SKAI';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${randomNum}`;
}

// Translation API - MyMemory (Free: 10,000 words/day)
async function translateText(text, fromLang, toLang) {
    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`
        );
        const data = await response.json();
        
        if (data.responseStatus === 200 && data.responseData) {
            return data.responseData.translatedText;
        } else {
            throw new Error('Translation failed');
        }
    } catch (error) {
        console.error('Translation error:', error);
        throw error;
    }
}

// Detect if text is primarily Malayalam or English
function detectLanguage(text) {
    // Malayalam Unicode range: 0D00-0D7F
    const malayalamRegex = /[\u0D00-\u0D7F]/;
    return malayalamRegex.test(text) ? 'ml' : 'en';
}

// AI Enhancement - Improve text quality and formality
async function enhanceTextWithAI(text, purpose, department) {
    // Since we want low-cost, we'll use a rule-based enhancement
    // that makes the text more formal and structured for government applications
    // This works without any API calls and is completely free
    
    let enhanced = text.trim();
    
    // Add formal opening if missing
    if (!enhanced.match(/^(വിനയപൂർവ്വം|ബഹുമാനപൂർവ്വം|ആദരവോടെ)/i)) {
        enhanced = 'വിനയപൂർവ്വം അറിയിക്കുന്നത്, ' + enhanced;
    }
    
    // Ensure proper sentence structure
    if (!enhanced.endsWith('.')) {
        enhanced += '.';
    }
    
    // Add formal closing if it's a request
    if (enhanced.includes('അപേക്ഷ') || enhanced.includes('ആവശ്യം')) {
        if (!enhanced.match(/(കാരുണ്യം|ദയവായി|പ്രതീക്ഷിക്കുന്നു)/i)) {
            enhanced += ' അതിനാൽ, ദയവായി ആവശ്യമായ നടപടികൾ സ്വീകരിക്കാൻ കാരുണ്യം പ്രതീക്ഷിക്കുന്നു.';
        }
    }
    
    // Capitalize first letter
    enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);
    
    // Add department-specific formal language
    const dept = departmentDetails[department];
    if (dept && !enhanced.includes(dept.name)) {
        // Text is already enhanced, return it
    }
    
    return enhanced;
}

// Handle AI Enhance button click
aiEnhanceBtn.addEventListener('click', async function() {
    const text = detailsTextarea.value.trim();
    const purpose = purposeInput.value.trim();
    const department = departmentSelect.value;
    
    if (!text) {
        alert('ദയവായി മെച്ചപ്പെടുത്താൻ വാചകം നൽകുക');
        return;
    }
    
    // Disable button during enhancement
    aiEnhanceBtn.disabled = true;
    aiEnhanceBtn.textContent = '✨ മെച്ചപ്പെടുത്തുന്നു...';
    
    try {
        // Simulate AI processing (you can replace this with actual API call)
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const enhancedText = await enhanceTextWithAI(text, purpose, department);
        detailsTextarea.value = enhancedText;
        
        // Show success message
        aiEnhanceBtn.textContent = '✅ മെച്ചപ്പെടുത്തി!';
        setTimeout(() => {
            aiEnhanceBtn.textContent = '✨ AI ഉപയോഗിച്ച് മെച്ചപ്പെടുത്തുക';
            aiEnhanceBtn.disabled = false;
        }, 2000);
    } catch (error) {
        alert('മെച്ചപ്പെടുത്തൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.');
        aiEnhanceBtn.textContent = '✨ AI ഉപയോഗിച്ച് മെച്ചപ്പെടുത്തുക';
        aiEnhanceBtn.disabled = false;
    }
});

// Auto-suggest purposes when department changes
departmentSelect.addEventListener('change', function() {
    const selectedDept = this.value;
    if (selectedDept && purposeSuggestions[selectedDept] && !purposeInput.value) {
        // Create a datalist for suggestions
        let datalist = document.getElementById('purposeSuggestions');
        if (!datalist) {
            datalist = document.createElement('datalist');
            datalist.id = 'purposeSuggestions';
            purposeInput.setAttribute('list', 'purposeSuggestions');
            form.insertBefore(datalist, purposeInput.nextSibling);
        }
        
        // Clear and add new options
        datalist.innerHTML = '';
        purposeSuggestions[selectedDept].forEach(suggestion => {
            const option = document.createElement('option');
            option.value = suggestion;
            datalist.appendChild(option);
        });
    }
});

// Handle translation button click
translateBtn.addEventListener('click', async function() {
    const text = detailsTextarea.value.trim();
    
    if (!text) {
        alert('ദയവായി പരിഭാഷ ചെയ്യാൻ വാചകം നൽകുക');
        return;
    }
    
    // Disable button during translation
    translateBtn.disabled = true;
    translateBtn.textContent = 'പരിഭാഷ ചെയ്യുന്നു...';
    
    try {
        const detectedLang = detectLanguage(text);
        const targetLang = detectedLang === 'ml' ? 'en' : 'ml';
        
        const translatedText = await translateText(text, detectedLang, targetLang);
        detailsTextarea.value = translatedText;
        
        // Show success message
        translateBtn.textContent = '✅ പരിഭാഷ പൂർത്തിയായി';
        setTimeout(() => {
            translateBtn.textContent = '🔄 English ↔ മലയാളം പരിഭാഷ';
            translateBtn.disabled = false;
        }, 2000);
    } catch (error) {
        alert('പരിഭാഷ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.');
        translateBtn.textContent = '🔄 English ↔ മലയാളം പരിഭാഷ';
        translateBtn.disabled = false;
    }
});

// Initialize the page
window.addEventListener('DOMContentLoaded', function() {
    // Set today's date
    const today = new Date();
    const dateInput = document.createElement('input');
    dateInput.type = 'hidden';
    dateInput.id = 'applicationDate';
    dateInput.value = today.toISOString().split('T')[0];
    form.appendChild(dateInput);
    
    // Set family code
    const familyCodeElement = document.getElementById('familyCode');
    familyCodeElement.textContent = generateFamilyCode();
});
