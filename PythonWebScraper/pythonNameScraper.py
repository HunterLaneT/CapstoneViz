import re
import requests
from bs4 import BeautifulSoup as bs

import csv

print("=================== Belk College of Business ===================")
URL = 'https://pages.charlotte.edu/connections/group/college-of-business/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topicNum = 0
topics = re.findall('"name":"(.*?)",', values)

urls = re.findall('"url":"(.*?)"}', values)

header = ['Topic', 'first_Author', 'URL_forAuthor1', 'second_Author', 'URL_forAuthor2', 'third_Author', 'URL_forAuthor3']

with open('dataNames.csv', 'w', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    writer.writerow(header)

    for url in urls:

        infoForRows = []

        topic_name = topics[topicNum]
        infoForRows.append(topic_name)

        URL1 = url
        Real_URL = URL1.replace("\\", "")
        req = requests.get(Real_URL)

        soup  = bs(req.text, 'html.parser')
        container = soup.find('div', attrs={'class', 'one-sidebar-width right-sidebar'})
        postConnections = container.find_all('div', attrs={'class', 'post connection'})
        i = 0
        j = 0
        j = len(postConnections)
        
        if(j > 3):
            j = 3
        for x in range(i, j):
        
            links = postConnections[x].find_all('a')
            #help with getting the href from the a tag from here: https://www.codegrepper.com/search.php?answer_removed=1&q=bs4%20get%20href%20of%20links
            url_link = links[0]['href']
            name = links[0].text

            infoForRows.append(name)
            infoForRows.append(url_link)
            print(url_link)

        writer.writerow(infoForRows)
        topicNum += 1

print("=================== College of Arts + Architecture ===================")
URL = 'https://pages.charlotte.edu/connections/group/college-of-arts-and-architecture/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topicNum = 0
topics = re.findall('"name":"(.*?)",', values)

urls = re.findall('"url":"(.*?)"}', values)

header = ['Topic', 'first_Author', 'URL_forAuthor1', 'second_Author', 'URL_forAuthor2', 'third_Author', 'URL_forAuthor3']

with open('dataNames.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    writer.writerow(header)

    for url in urls:

        infoForRows = []

        topic_name = topics[topicNum]
        infoForRows.append(topic_name)

        URL1 = url
        Real_URL = URL1.replace("\\", "")
        req = requests.get(Real_URL)

        soup  = bs(req.text, 'html.parser')
        container = soup.find('div', attrs={'class', 'one-sidebar-width right-sidebar'})
        postConnections = container.find_all('div', attrs={'class', 'post connection'})
        i = 0
        j = 0
        j = len(postConnections)
        
        if(j > 3):
            j = 3
        for x in range(i, j):
        
            links = postConnections[x].find_all('a')
            #help with getting the href from the a tag from here: https://www.codegrepper.com/search.php?answer_removed=1&q=bs4%20get%20href%20of%20links
            url_link = links[0]['href']
            name = links[0].text

            infoForRows.append(name)
            infoForRows.append(url_link)
            print(url_link)
            
        writer.writerow(infoForRows)
        topicNum += 1      


print("=================== College of Computing & Informatics ===================")
URL = 'https://pages.charlotte.edu/connections/group/cci/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topicNum = 0
topics = re.findall('"name":"(.*?)",', values)

urls = re.findall('"url":"(.*?)"}', values)

header = ['Topic', 'first_Author', 'URL_forAuthor1', 'second_Author', 'URL_forAuthor2', 'third_Author', 'URL_forAuthor3']

with open('dataNames.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    writer.writerow(header)

    for url in urls:

        infoForRows = []

        topic_name = topics[topicNum]
        infoForRows.append(topic_name)

        URL1 = url
        Real_URL = URL1.replace("\\", "")
        req = requests.get(Real_URL)

        soup  = bs(req.text, 'html.parser')
        container = soup.find('div', attrs={'class', 'one-sidebar-width right-sidebar'})
        postConnections = container.find_all('div', attrs={'class', 'post connection'})
        i = 0
        j = 0
        j = len(postConnections)
        
        if(j > 3):
            j = 3
        for x in range(i, j):
        
            links = postConnections[x].find_all('a')
            #help with getting the href from the a tag from here: https://www.codegrepper.com/search.php?answer_removed=1&q=bs4%20get%20href%20of%20links
            url_link = links[0]['href']
            name = links[0].text

            infoForRows.append(name)
            infoForRows.append(url_link)
            print(url_link)
            
        writer.writerow(infoForRows)
        topicNum += 1     


print("=================== College of Education ===================")
URL = 'https://pages.charlotte.edu/connections/group/coed/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topicNum = 0
topics = re.findall('"name":"(.*?)",', values)

urls = re.findall('"url":"(.*?)"}', values)

header = ['Topic', 'first_Author', 'URL_forAuthor1', 'second_Author', 'URL_forAuthor2', 'third_Author', 'URL_forAuthor3']

with open('dataNames.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    writer.writerow(header)

    for url in urls:

        infoForRows = []

        topic_name = topics[topicNum]
        infoForRows.append(topic_name)

        URL1 = url
        Real_URL = URL1.replace("\\", "")
        req = requests.get(Real_URL)

        soup  = bs(req.text, 'html.parser')
        container = soup.find('div', attrs={'class', 'one-sidebar-width right-sidebar'})
        postConnections = container.find_all('div', attrs={'class', 'post connection'})
        i = 0
        j = 0
        j = len(postConnections)
        
        if(j > 3):
            j = 3
        for x in range(i, j):
        
            links = postConnections[x].find_all('a')
            #help with getting the href from the a tag from here: https://www.codegrepper.com/search.php?answer_removed=1&q=bs4%20get%20href%20of%20links
            url_link = links[0]['href']
            name = links[0].text

            infoForRows.append(name)
            infoForRows.append(url_link)
            print(url_link)

        writer.writerow(infoForRows)
        topicNum += 1    

print("=================== College of Health & Human Services ===================")
URL = 'https://pages.charlotte.edu/connections/group/chhs/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topicNum = 0
topics = re.findall('"name":"(.*?)",', values)

urls = re.findall('"url":"(.*?)"}', values)

header = ['Topic', 'first_Author', 'URL_forAuthor1', 'second_Author', 'URL_forAuthor2', 'third_Author', 'URL_forAuthor3']

with open('dataNames.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    writer.writerow(header)

    for url in urls:

        infoForRows = []

        topic_name = topics[topicNum]
        infoForRows.append(topic_name)

        URL1 = url
        Real_URL = URL1.replace("\\", "")
        req = requests.get(Real_URL)

        soup  = bs(req.text, 'html.parser')
        container = soup.find('div', attrs={'class', 'one-sidebar-width right-sidebar'})
        postConnections = container.find_all('div', attrs={'class', 'post connection'})
        i = 0
        j = 0
        j = len(postConnections)
        
        if(j > 3):
            j = 3
        for x in range(i, j):
        
            links = postConnections[x].find_all('a')
            #help with getting the href from the a tag from here: https://www.codegrepper.com/search.php?answer_removed=1&q=bs4%20get%20href%20of%20links
            url_link = links[0]['href']
            name = links[0].text

            infoForRows.append(name)
            infoForRows.append(url_link)
            print(url_link)

        writer.writerow(infoForRows)
        topicNum += 1      

print("=================== College of Liberal Arts & Sciences ===================")
URL = 'https://pages.charlotte.edu/connections/group/clas/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topicNum = 0
topics = re.findall('"name":"(.*?)",', values)

urls = re.findall('"url":"(.*?)"}', values)

header = ['Topic', 'first_Author', 'URL_forAuthor1', 'second_Author', 'URL_forAuthor2', 'third_Author', 'URL_forAuthor3']

with open('dataNames.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    writer.writerow(header)

    for url in urls:

        infoForRows = []

        topic_name = topics[topicNum]
        infoForRows.append(topic_name)

        URL1 = url
        Real_URL = URL1.replace("\\", "")
        req = requests.get(Real_URL)

        soup  = bs(req.text, 'html.parser')
        container = soup.find('div', attrs={'class', 'one-sidebar-width right-sidebar'})
        postConnections = container.find_all('div', attrs={'class', 'post connection'})
        i = 0
        j = 0
        j = len(postConnections)
        
        if(j > 3):
            j = 3
        for x in range(i, j):
        
            links = postConnections[x].find_all('a')
            #help with getting the href from the a tag from here: https://www.codegrepper.com/search.php?answer_removed=1&q=bs4%20get%20href%20of%20links
            url_link = links[0]['href']
            name = links[0].text

            infoForRows.append(name)
            infoForRows.append(url_link)
            print(url_link)

        writer.writerow(infoForRows)
        topicNum += 1     

print("=================== Lee College of Engineering ===================")
URL = 'https://pages.charlotte.edu/connections/group/college-of-engineering/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topicNum = 0
topics = re.findall('"name":"(.*?)",', values)

urls = re.findall('"url":"(.*?)"}', values)

header = ['Topic', 'first_Author', 'URL_forAuthor1', 'second_Author', 'URL_forAuthor2', 'third_Author', 'URL_forAuthor3']

with open('dataNames.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    writer.writerow(header)

    for url in urls:

        infoForRows = []

        topic_name = topics[topicNum]
        infoForRows.append(topic_name)

        URL1 = url
        Real_URL = URL1.replace("\\", "")
        req = requests.get(Real_URL)

        soup  = bs(req.text, 'html.parser')
        container = soup.find('div', attrs={'class', 'one-sidebar-width right-sidebar'})
        postConnections = container.find_all('div', attrs={'class', 'post connection'})
        i = 0
        j = 0
        j = len(postConnections)
        
        if(j > 3):
            j = 3
        for x in range(i, j):
        
            links = postConnections[x].find_all('a')
            #help with getting the href from the a tag from here: https://www.codegrepper.com/search.php?answer_removed=1&q=bs4%20get%20href%20of%20links
            url_link = links[0]['href']
            name = links[0].text

            infoForRows.append(name)
            infoForRows.append(url_link)
            print(url_link)
            
        writer.writerow(infoForRows)
        topicNum += 1      

print("=================== School of Data Science (SDS) ===================")
URL = 'https://pages.charlotte.edu/connections/group/school-of-data-science-sds/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topicNum = 0
topics = re.findall('"name":"(.*?)",', values)

urls = re.findall('"url":"(.*?)"}', values)

header = ['Topic', 'first_Author', 'URL_forAuthor1', 'second_Author', 'URL_forAuthor2', 'third_Author', 'URL_forAuthor3']

with open('dataNames.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    writer.writerow(header)

    for url in urls:

        infoForRows = []

        topic_name = topics[topicNum]
        infoForRows.append(topic_name)

        URL1 = url
        Real_URL = URL1.replace("\\", "")
        req = requests.get(Real_URL)

        soup  = bs(req.text, 'html.parser')
        container = soup.find('div', attrs={'class', 'one-sidebar-width right-sidebar'})
        postConnections = container.find_all('div', attrs={'class', 'post connection'})
        i = 0
        j = 0
        j = len(postConnections)
        
        if(j > 3):
            j = 3
        for x in range(i, j):
        
            links = postConnections[x].find_all('a')
            #help with getting the href from the a tag from here: https://www.codegrepper.com/search.php?answer_removed=1&q=bs4%20get%20href%20of%20links
            url_link = links[0]['href']
            name = links[0].text

            infoForRows.append(name)
            infoForRows.append(url_link)
            print(url_link)
            
        writer.writerow(infoForRows)
        topicNum += 1

