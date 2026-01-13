import fs from 'fs';
const files = ['services.html', 'about.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove extra color definitions, keep only deep-navy and golden-sun
    content = content.replace(
        /\.sandy-beige[\s\S]*?\.bg-sandy-beige.*?\n.*?\.sunset-orange[\s\S]*?\.bg-sunset-orange.*?\n/g,
        ''
    );
    content = content.replace(
        /\.ocean-teal[\s\S]*?\.bg-ocean-teal.*?\n.*?\.soft-cream[\s\S]*?\.bg-soft-cream.*?\n.*?\.warm-blue[\s\S]*?\.bg-warm-blue.*?\n/g,
        ''
    );

    // Simplify Tailwind config
    content = content.replace(
        /'sandy-beige':.*?\n.*?'sunset-orange':.*?\n/g,
        ''
    );
    content = content.replace(
        /'ocean-teal':.*?\n.*?'soft-cream':.*?\n.*?'warm-blue':.*?\n/g,
        ''
    );

    // Replace color usage
    content = content.replace(/bg-soft-cream/g, 'bg-white');
    content = content.replace(/soft-cream/g, 'white');
    content = content.replace(/ocean-teal/g, 'golden-sun');
    content = content.replace(/sunset-orange/g, 'golden-sun');
    content = content.replace(/warm-blue/g, 'deep-navy');
    content = content.replace(/warm-beach-gradient/g, 'golden-gradient');
    content = content.replace(/ocean-gradient/g, 'bg-deep-navy');
    content = content.replace(/soft-gradient/g, 'bg-white');

    // Add golden-gradient if not exists
    if (!content.includes('golden-gradient')) {
        content = content.replace(
            /\/\* Gradients \*\//,
            `/* Gradients */\n        .golden-gradient {\n            background: linear-gradient(135deg, #f7bb14 0%, #ffd65a 100%);\n        }`
        );
    }

    fs.writeFileSync(file, content);
    console.log(`✅ Simplified ${file}`);
});

console.log('\n🎨 All files simplified to 3 colors: Navy + Golden + White!');
