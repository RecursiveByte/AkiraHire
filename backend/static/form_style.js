// Imagine this comes from your backend

const formSchema = {

    title:"Software Engineer Application",

    description:"Please fill the application form below.",

    fields:[

        {
            type:"heading",
            text:"Personal Information"
        },

        {
            id:"name",
            type:"text",
            label:"Full Name",
            required:true
        },

        {
            id:"email",
            type:"email",
            label:"Email",
            required:true
        },

        {
            id:"phone",
            type:"tel",
            label:"Phone Number"
        },

        {
            type:"divider"
        },

        {
            type:"heading",
            text:"Professional Information"
        },

        {
            id:"experience",
            type:"number",
            label:"Years of Experience"
        },

        {
            id:"role",
            type:"select",
            label:"Preferred Role",

            options:[
                "Frontend",
                "Backend",
                "Full Stack",
                "AI Engineer"
            ]
        },

        {
            id:"remote",
            type:"radio",
            label:"Open To Remote Work?",

            options:[
                "Yes",
                "No"
            ]
        },

        {
            id:"about",
            type:"textarea",
            label:"Tell us about yourself"
        },

        {
            id:"resume",
            type:"file",
            label:"Upload Resume",
            accept:".pdf,.doc,.docx"
        }

    ]
};

const container = document.getElementById("formContainer");

const card = document.createElement("div");
card.className="form-card";

const title=document.createElement("h1");
title.innerText=formSchema.title;

const desc=document.createElement("p");
desc.className="description";
desc.innerText=formSchema.description;

card.appendChild(title);
card.appendChild(desc);

const form=document.createElement("form");

formSchema.fields.forEach(field=>{

    if(field.type==="heading"){

        const h=document.createElement("h2");
        h.className="section-title";
        h.innerText=field.text;

        form.appendChild(h);

        return;
    }

    if(field.type==="divider"){

        form.appendChild(document.createElement("hr"));

        return;
    }

    const group=document.createElement("div");
    group.className="form-group";

    const label=document.createElement("label");
    label.innerText=field.label;

    group.appendChild(label);

    let input;

    switch(field.type){

        case "text":
        case "email":
        case "tel":
        case "number":

            input=document.createElement("input");

            input.type=field.type;

            break;

        case "textarea":

            input=document.createElement("textarea");

            break;

        case "select":

            input=document.createElement("select");

            field.options.forEach(option=>{

                const op=document.createElement("option");

                op.value=option;

                op.innerText=option;

                input.appendChild(op);

            });

            break;

        case "radio":

            input=document.createElement("div");

            input.className="radio-group";

            field.options.forEach(option=>{

                const radio=document.createElement("input");

                radio.type="radio";

                radio.name=field.id;

                radio.value=option;

                const span=document.createElement("span");

                span.innerText=option;

                input.appendChild(radio);

                input.appendChild(span);

            });

            break;

        case "file":

            input=document.createElement("input");

            input.type="file";

            input.accept=field.accept;

            const fileName=document.createElement("div");

            fileName.className="file-name";

            input.addEventListener("change",()=>{

                if(input.files.length){

                    fileName.innerText=input.files[0].name;

                }

            });

            group.appendChild(input);

            group.appendChild(fileName);

            form.appendChild(group);

            return;
    }

    if(field.required){

        input.required=true;

    }

    group.appendChild(input);

    form.appendChild(group);

});

const button=document.createElement("button");

button.innerText="Submit Application";

button.className="submit-btn";

form.appendChild(button);

card.appendChild(form);

container.appendChild(card);