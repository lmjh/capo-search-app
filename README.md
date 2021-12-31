# Capo Chord Search Application

The purpose of this site is to provide a useful utility for beginner and intermediate guitarists, to help them play a wider range of songs with the most basic chord shapes that all beginner guitarists learn. 

Most guitarists start by learning the following nine basic chords, known as ‘open chords’: A, Am, C, D, Dm, E, Em, F, and G. However, there are six more major chords and nine more minor chords. To play these, guitarists have to use more complex and difficult ‘barre chords’. 

As an alternative, many guitarists use a tool called a ‘capo’, which raises the pitch of the strings depending on which fret it’s attached to. Using a capo, a guitarist can use easy open chords to play a song that would normally require challenging barre chords. For example, a song that called for a C#, an F# and a B chord could be played easily with the A, D and G chord shapes and a capo on the fourth fret.

There are eleven potential positions for a capo, each providing a unique set of transposed open chords, so it can be very time consuming for a guitarist to check each one to see if there are good options for the particular set of chords they want to play. 

This site aims to solve this problem by allowing a user to select a target set of chords and then quickly displaying any and all simplified methods of playing that set of chords using a capo.

***

## User Experience

### New User Stories

* As a new user, I want to quickly understand the purpose of the site so that I can decide if it provides value to me.
* As a new user, I want to be able to quickly understand how to use the application to meet my needs.
* As a new user, I want to intuitively understand how to access all the information and features available.
* As a new user, I want to know where to look for more information and help if I don’t understand something.

### Returning User Stories

* As a returning user, I want to be able to quickly access the features I’m interested in.

### Design

The site's overall design is quite minimalist in order to avoid distracting the user's eye from the key information presented. 

#### Colour Scheme

* The site has a 'dark mode' design, to make it easy and comfortable to read in any lighting conditions.
* Three shades of dark grey are used for section backgrounds, to provide some visual depth to the different sections while maintaining high contrast with the text.

![Illustration of three shades of grey applied to FAQ section](documentation/readme-images/faq.jpg)

* To help the user identify chord names and shapes, a colour is assigned to each Major chord. The colours are roughly evenly spaced across the spectrum. A lighter version of roughly the same colour is assigned to each Minor chord.

![Illustration of colour scheme applied to application buttons](documentation/readme-images/buttons.jpg)

* Colour is used only for chords; all other UI elements are in black, white and grey. This is intended to avoid distracting the eye and help reinforce the association between colours and chords for the user.

* The majority of the site's colours are applied using CSS root variables. This allows for quick changes to all similarly coloured site elements if required.

#### Typography

* Only two fonts are used on the site: One font for chord names and one font for all other content. This is intended to provide some visual contrast between the chord names and the rest of the content, to help them stand out.
* Most of the text on the site uses the [Quicksand](https://fonts.google.com/specimen/Quicksand) font from Google Fonts. This font was selected as it is suitable for both headings and body text and is designed to be easily readable even at smaller sizes.
* Chord names are all rendered in the [Roboto](https://fonts.google.com/specimen/Roboto) font. This font was selected as it is highly legible and the Medium weight font is used to provide a little more weight than the standard regular weight.

#### Imagery

* The site uses png screenshots of site elements in the tutorial section, to illustrate the instructions.
* Chord diagrams are used both above the user input section and in the results section. These diagrams show users who aren't familiar with the basic chord shapes how to form those chords. The diagrams use the same colours associated with the chord they depict elsewhere on the site. SVG vector files are used for the diagrams, to keep file sizes to a minimum and allow for clean scaling to different sizes.
* Each set of results includes an illustration of a guitar neck with a thick white line to indicate the capo position for that result set. Although the required capo position is included in the text for each set of results, the illustrations provide a little extra information to the user as they show where to position the capo relative to the dot markings on the neck, without having to count the frets. SVG vector files are also used for these illustrations, to keep file sizes to a minimum and allow for clean scaling to different sizes.

### Wireframes

The site is responsively designed and will adapt to the viewing device.

![Combined image of mobile, tablet and desktop wireframes](documentation/wireframes/wireframes.jpg)

Full size wireframes for each viewing device category can be viewed here:

* Mobile layout wireframe - [View](documentation/wireframes/mobile.png)
* Tablet layout wireframe - [View](documentation/wireframes/tablet.png)
* Desktop layout wireframe - [View](documentation/wireframes/desktop.png)


***

## Features



***

## Organisation of Content



***

## Technologies

### Languages Used

* HTML5
* CSS3
* Javascript

### Frameworks, Libraries & Programs Used

1. [GitHub](https://github.com/) - Used for version control and deployment through GitHub Pages.
2. [GitPod](https://gitpod.io/) - Used to write all code and test before deploying to GitHub.
3. [Balsamiq](https://balsamiq.com/) - Used to produce design wireframes.
4. [Bootstrap](https://getbootstrap.com/) - Version 5.1.3 used extensively through the site to assist with layout and basic styling. In particular, the responsive grid, tutorial section cards, basic button styles, FAQ section accordion and various layout utility classes. The [Bootstrap 5.1 documentation](https://getbootstrap.com/docs/5.1/getting-started/introduction/) was used for reference.
5. jQuery - 
6. Affinity Designer - 
7. Affinity Photo - 
8. Google Fonts - 
9. Jest - 

***

## Testing

Please see [TESTING.md](TESTING.md) for details of tests performed and bugs fixed.

***

## Deployment

### Deploying to GitHub Pages

The site was deployed to GitHub Pages using the following process:

1. Log in to GitHub.
2. Click the "Repositories" link at the top of the GitHub user dashboard.
3. Locate the [GitHub project repository](https://github.com/lmjh/capo-search-app) and click its title.
4. On the project page, click the "Settings" link in the options menu at the top of the page.
5. Click the "Pages" link near the bottom of the menu on the Settings page.
6. On the GitHub Pages settings menu, click the dropdown beneath "Source" and select "main".
7. Check that the new dropdown that appears displays "/ (root)" and then click "Save".
8. A confirmation message should appear with a link to the deployed site. Click this link to view the site. (It may take a minute or two for the site to be available.)

### Forking the GitHub Repository

By forking the GitHub Repository we make a copy of the original repository on our GitHub account to view and/or make changes without affecting the original repository by using the following steps...

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/lmjh/capo-search-app)
2. At the top of the Repository (not top of page) just above the "Settings" Button on the menu, locate the "Fork" Button.
3. You should now have a copy of the original repository in your GitHub account.

### Making a Local Clone

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/lmjh/capo-search-app)
2. Under the repository name, click "Clone or download".
3. To clone the repository using HTTPS, under "Clone with HTTPS", copy the link.
4. Open Git Bash
5. Change the current working directory to the location where you want the cloned directory to be made.
6. Type `git clone`, and then paste the URL you copied in Step 3.

```
$ git clone https://github.com/lmjh/capo-search-app.git
```

7. Press Enter. Your local clone will be created.

```
$ git clone https://github.com/lmjh/capo-search-app.git
> Cloning into `CI-Clone`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```

Click [Here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository#cloning-a-repository-to-github-desktop) to retrieve pictures for some of the buttons and more detailed explanations of the above process.

Alternatively, if using Gitpod, you can click below to create your own workspace using this repository.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/lmjh/capo-search-app)

***

## Other Credits and Acknowledgements
