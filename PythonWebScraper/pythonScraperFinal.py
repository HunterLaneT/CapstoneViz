#Help with using regex to find the topics (name), count, and url: https://www.w3schools.com/python/python_regex.asp
#and here: https://stackoverflow.com/questions/32680030/match-text-between-two-strings-with-regular-expression
#
#Help with writing to csv files: https://www.pythontutorial.net/python-basics/python-write-csv-file/
#and here (this is more with adding more rows to an existing csv file): https://thispointer.com/python-how-to-append-a-new-row-to-an-existing-csv-file/
#
#Help with loops, and arrays: https://www.w3schools.com/python/python_for_loops.asp
#and here: https://www.w3schools.com/python/python_arrays.asp
#and here (adding items to an array, from this I wanted to know how to add items to the end of an array): https://www.askpython.com/python/array/python-add-elements-to-an-array

import re
import requests
from bs4 import BeautifulSoup as bs

import csv

print("=================== Belk College of Business ===================")
URL = 'https://pages.charlotte.edu/connections/group/college-of-business/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topics = re.findall('"name":"(.*?)",', values)
# print(names)

counts = re.findall('"count":(.*?),"', values)
# print(count)

urls = re.findall('"url":"(.*?)"}', values)
# print(url)

# print(len(topics))

# print(len(counts))

# print(len(urls))

totalRowCount = 0

header = ['College', 'Topic', 'Count', 'URL']

with open('data.csv', 'w', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    writer.writerow(header)

    for i in range(len(topics)):

        infoForRows = []

        infoForRows.append('Belk College of Business')
        infoForRows.append(topics[i])
        infoForRows.append(counts[i])
        infoForRows.append(urls[i])

        writer.writerow(infoForRows)
        totalRowCount += 1

print("=================== College of Arts + Architecture ===================")
URL = 'https://pages.charlotte.edu/connections/group/college-of-arts-and-architecture/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topics = re.findall('"name":"(.*?)",', values)
# print(names)

counts = re.findall('"count":(.*?),"', values)
# print(count)

urls = re.findall('"url":"(.*?)"}', values)
# print(url)

# print(len(topics))

# print(len(counts))

# print(len(urls))

with open('data.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    for i in range(len(topics)):

        infoForRows = []

        infoForRows.append('College of Arts + Architecture')
        infoForRows.append(topics[i])
        infoForRows.append(counts[i])
        infoForRows.append(urls[i])

        writer.writerow(infoForRows)
        totalRowCount += 1

print("=================== College of Computing & Informatics ===================")
URL = 'https://pages.charlotte.edu/connections/group/cci/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topics = re.findall('"name":"(.*?)",', values)
# print(names)

counts = re.findall('"count":(.*?),"', values)
# print(count)

urls = re.findall('"url":"(.*?)"}', values)
# print(url)

# print(len(topics))

# print(len(counts))

# print(len(urls))

with open('data.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    for i in range(len(topics)):

        infoForRows = []

        infoForRows.append('College of Computing & Informatics')
        infoForRows.append(topics[i])
        infoForRows.append(counts[i])
        infoForRows.append(urls[i])

        writer.writerow(infoForRows)
        totalRowCount += 1

print("=================== College of Education ===================")
URL = 'https://pages.charlotte.edu/connections/group/coed/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topics = re.findall('"name":"(.*?)",', values)
# print(names)

counts = re.findall('"count":(.*?),"', values)
# print(count)

urls = re.findall('"url":"(.*?)"}', values)
# print(url)

# print(len(topics))

# print(len(counts))

# print(len(urls))

with open('data.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    for i in range(len(topics)):

        infoForRows = []

        infoForRows.append('College of Education')
        infoForRows.append(topics[i])
        infoForRows.append(counts[i])
        infoForRows.append(urls[i])

        writer.writerow(infoForRows)
        totalRowCount += 1

print("=================== College of Health & Human Services ===================")
URL = 'https://pages.charlotte.edu/connections/group/chhs/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topics = re.findall('"name":"(.*?)",', values)
# print(names)

counts = re.findall('"count":(.*?),"', values)
# print(count)

urls = re.findall('"url":"(.*?)"}', values)
# print(url)

# print(len(topics))

# print(len(counts))

# print(len(urls))

with open('data.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    for i in range(len(topics)):

        infoForRows = []

        infoForRows.append('College of Health & Human Services')
        infoForRows.append(topics[i])
        infoForRows.append(counts[i])
        infoForRows.append(urls[i])

        writer.writerow(infoForRows)
        totalRowCount += 1

print("=================== College of Liberal Arts & Sciences ===================")
URL = 'https://pages.charlotte.edu/connections/group/clas/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topics = re.findall('"name":"(.*?)",', values)
# print(names)

counts = re.findall('"count":(.*?),"', values)
# print(count)

urls = re.findall('"url":"(.*?)"}', values)
# print(url)

# print(len(topics))

# print(len(counts))

# print(len(urls))

with open('data.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    for i in range(len(topics)):

        infoForRows = []

        infoForRows.append('College of Liberal Arts & Sciences')
        infoForRows.append(topics[i])
        infoForRows.append(counts[i])
        infoForRows.append(urls[i])

        writer.writerow(infoForRows)
        totalRowCount += 1

print("=================== Lee College of Engineering ===================")
URL = 'https://pages.charlotte.edu/connections/group/college-of-engineering/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topics = re.findall('"name":"(.*?)",', values)
# print(names)

counts = re.findall('"count":(.*?),"', values)
# print(count)

urls = re.findall('"url":"(.*?)"}', values)
# print(url)

# print(len(topics))

# print(len(counts))

# print(len(urls))

with open('data.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    for i in range(len(topics)):

        infoForRows = []

        infoForRows.append('Lee College of Engineering')
        infoForRows.append(topics[i])
        infoForRows.append(counts[i])
        infoForRows.append(urls[i])

        writer.writerow(infoForRows)
        totalRowCount += 1

print("=================== School of Data Science (SDS) ===================")
URL = 'https://pages.charlotte.edu/connections/group/school-of-data-science-sds/'

req = requests.get(URL)

soup  = bs(req.text, 'html.parser')
values = soup.find('input', attrs={'class', 'tags'})['value']

topics = re.findall('"name":"(.*?)",', values)
# print(names)

counts = re.findall('"count":(.*?),"', values)
# print(count)

urls = re.findall('"url":"(.*?)"}', values)
# print(url)

# print(len(topics))

# print(len(counts))

# print(len(urls))

with open('data.csv', 'a+', encoding='UTF8', newline = '') as f:

    writer = csv.writer(f)

    for i in range(len(topics)):

        infoForRows = []

        infoForRows.append('School of Data Science (SDS)')
        infoForRows.append(topics[i])
        infoForRows.append(counts[i])
        infoForRows.append(urls[i])

        writer.writerow(infoForRows)
        totalRowCount += 1

#prints out the total number of rows the csv file "should" have
print(totalRowCount + 1)