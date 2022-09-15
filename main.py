from posixpath import basename
import eel
import shutil
import os
import base64
import sys

eel.init('web')

@eel.expose
def send_publication(name, authors, publisher, date, link):
    print(name, authors, publisher, date)
    nameNoSpace = name
    nameNoSpace = nameNoSpace.replace(" ", "-")

    f = open(f"_publications/{date}-{nameNoSpace}.md", "w", encoding="utf-8")

    year = date.split("-")[0]

    result = f"""---
layout: default
title: {name}
authors: {authors}
publication: {publisher}
year: {year}
link: {link}
---"""
    f.write(result)


#POSTERJI
@eel.expose
def send_poster(name, imgName, imgdata, date):
    #print(name, img, date)
    nameNoSpace = name
    nameNoSpace = nameNoSpace.replace(" ", "-")

    f = open(f"_posters/{date}-{nameNoSpace}.md", "w", encoding="utf-8")

    year = date.split("-")[0]

    original = imgName
    target = f"assets/images/{imgName}"


    head, data = imgdata.split(',')

    decoded = base64.b64decode(data)

    with open(target, "wb+") as fh:
        fh.write(decoded)

    result = f"""---
layout: default
title: {name}
year: {year}
imgname: {imgName}
---"""
    f.write(result)


#PROJEKTI
@eel.expose
def send_project(name, imgName, imgdata, date, description, content):
    #print(name, img, date)
    print('Uspesno')
    nameNoSpace = name
    nameNoSpace = nameNoSpace.replace(" ", "-")

    f = open(f"_projects/{date}-{nameNoSpace}.md", "w", encoding="utf-8")

    year = date.split("-")[0]

    original = imgName
    target = f"assets/images/{imgName}"

    if(imgName != 'null'):
        head, data = imgdata.split(',')
        decoded = base64.b64decode(data)

        with open(target, "wb+") as fh:
            fh.write(decoded)
    



    result = f"""---
title: {name}
description: {description}
imgname: {imgName}
---
{content}"""
    f.write(result)

@eel.expose
def save_image(imgname, data):
    target = f"assets/images/{imgname}"

    if(imgname != 'null'):
        head, data = data.split(',')
        decoded = base64.b64decode(data)

        with open(target, "wb+") as fh:
            fh.write(decoded)

eel.start('index.html')

