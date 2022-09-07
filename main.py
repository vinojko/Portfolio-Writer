import eel

eel.init('web')




@eel.expose
def send_publication(name, authors, publisher, date):
    print(name, authors, publisher, date)

eel.start('index.html')