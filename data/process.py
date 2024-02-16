file_name = "./cet4.js"

file = open(file_name, encoding="utf-8")
raw_content = file.read()
file.close()
content = raw_content[raw_content.find("data = ")+7:raw_content.find("var length")]
# print(content[:10])
content = eval(content)
for i in range(len(content)):
    item = content[i]
    item.append()
print(type(content))