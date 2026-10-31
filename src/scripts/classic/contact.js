const form=document.querySelector('#enquiry-form');
const params=new URLSearchParams(location.search);
for(const name of ['service','industry','location']){const field=form.elements.namedItem(name);const value=params.get(name);if(value&&[...field.options].some(o=>o.value===value))field.value=value}
if(params.get('goal')==='project')form.elements.namedItem('message').value='I would like to discuss a project requirement.';
if(params.get('goal')==='technology')form.elements.namedItem('message').value='I would like to explore international growth for our technology.';
form.addEventListener('submit',event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const data=new FormData(form);const label=name=>{const field=form.elements.namedItem(name);return field.tagName==='SELECT'?field.selectedOptions[0].textContent:String(data.get(name)||'Not specified')};
 const text='NORDISKA SOLUTIONS — ENQUIRY\n\n'+[['name','Name'],['company','Company'],['email','Work email'],['service','Service'],['industry','Industry'],['location','Location'],['market','Target market'],['technology','Technology / project'],['message','Opportunity']].map(([key,title])=>`${title}: ${label(key)}`).join('\n\n');
 const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='nordiska-enquiry.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 const status=document.querySelector('#enquiry-status');status.hidden=false;status.textContent='Your enquiry has been prepared for download. It has not been sent to Nordiska.';
});
