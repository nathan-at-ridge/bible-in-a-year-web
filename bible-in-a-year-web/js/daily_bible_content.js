import bible_content from '/bible-in-a-year-web/json/bible_content.json' assert {type: 'json'};
//get today's date and insert date into webpage
const d = new Date();
let day = d.getDate();
let month = d.toLocaleString('default', {month: 'long'})
let year = d.getFullYear();
document.getElementById("date").innerHTML = month.concat(" ", day, ", ", year);
//determine what day we're on in the reading plan
let jan1 = new Date('01/01/2022');
let day_in_plan = (d.getTime() - jan1.getTime()) / (1000 * 3600 * 24);
day_in_plan = Math.floor(day_in_plan); //remove remainder from quotient
day_in_plan = 69;
if (day_in_plan < 0) { //if plan has not yet begun
    document.getElementById("date").style.display = "none";
    document.getElementById("readings_wrapper").style.display = "none";
    document.getElementById("readings_theme").innerHTML = "Check back January 1st for daily video and blog content to enhance your journey through the Holy Bible!";
} else {
    //pull today's theme and readings from json and insert into webpage
    let readings_text = (bible_content.day[day_in_plan].book).concat(" ", bible_content.day[day_in_plan].ch);
    let readings_link = "https://www.biblegateway.com/passage/?search=".concat(bible_content.day[day_in_plan].book,"+",bible_content.day[day_in_plan].ch,"&version=ESV");
    let readings = '<a href="'.concat(readings_link, '" target="_blank">', readings_text, '</a>');
    let psalm_text = "Psalm ".concat(bible_content.day[day_in_plan].psalm);
    let psalm_first3char = (bible_content.day[day_in_plan].psalm).substring(0, 3);
    let psalm_link = "https://www.biblegateway.com/passage/?search=psalm+1&version=ESV";
    if (psalm_first3char == 119) { //deal with incomplete chapters in Psalm 119 in reading plan
        let verses = (bible_content.day[day_in_plan].psalm).replace ("119 vv. ", "");
        psalm_link = "https://www.biblegateway.com/passage/?search=Psalm+119%3A".concat(verses, "&version=ESV");
    } else {
    psalm_link = "https://www.biblegateway.com/passage/?search=Psalm+".concat(bible_content.day[day_in_plan].psalm, "&version=ESV");
    }
    let psalm = '<a href="'.concat(psalm_link, '" target="_blank">', psalm_text, '</a>');
    document.getElementById("readings_theme").innerHTML = bible_content.day[day_in_plan].heading;
    document.getElementById("readings").innerHTML = readings;
    document.getElementById("psalm").innerHTML = psalm;
    //select commentary intro text based on what commentary content there is for a given day
    let readings_wrapper = document.getElementById("readings_wrapper").innerHTML;
    let today_content = Object.keys(bible_content.day[day_in_plan]);
    if (today_content.includes("video_url") && today_content.includes("blog_url")) {
        readings_wrapper = readings_wrapper.concat(" To enhance your learning, check out the video and blog post below.");
    } else if (today_content.includes("video_url")) {
        readings_wrapper = readings_wrapper.concat(" To enhance your learning, check out the video below.");
    } else if (today_content.includes("blog_url")) {
        readings_wrapper = readings_wrapper.concat(" To enhance your learning, check out the blog post below.");
    } else {
        readings_wrapper = readings_wrapper.concat(" We hope you enjoy today's readings! Be sure to check this page regularly for video and blog content to enhance your learning.");
    }
    document.getElementById("readings_wrapper").innerHTML = readings_wrapper;
    //insert video
    if (today_content.includes("video_url")) {
        let video_title = bible_content.day[day_in_plan].video_title;
        if ((video_title.charAt(video_title.length - 1)) === ' ') {
            video_title = video_title.substring(0, video_title.length - 1)
        }
        let video_url = bible_content.day[day_in_plan].video_url;
        let video_html = '<strong>Video: </strong>Watch <a href="';
        video_html = video_html.concat(video_url, '" target="_blank">"');
        video_html = video_html.concat(video_title, '"</a> on the Bible Project website.');
        document.getElementById("commentary_video").innerHTML = video_html;
    } //insert blog post
    if (today_content.includes("blog_url")) {
        let blog_title = bible_content.day[day_in_plan].blog_title;
        if ((blog_title.charAt(blog_title.length - 1)) === ' ') {
            blog_title = blog_title.substring(0, blog_title.length - 1)
        }
        let blog_url = bible_content.day[day_in_plan].blog_url;
        let blog_html = '<strong>Blog Post: </strong>Read <a href="';
        blog_html = blog_html.concat(blog_url, '" target="_blank">"');
        blog_html = blog_html.concat(blog_title, '"</a> on the Bible Project website.');
        document.getElementById("commentary_blog").innerHTML = blog_html;
    }
}
