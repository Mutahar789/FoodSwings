with open("images.txt", "r") as f: ##open file in read mode, w for write
    #content = f.read()
    lines = f.readlines()
    print(lines)

#reading only uptill certain chars of a file = content = f.read(10)

with open("vendor name.txt", encoding="utf-8") as f2:
    lines2 = f2.readlines()
    print(lines2)

with open("boy names.txt", "r") as f3:
    lines3 = f3.readlines()
    print(lines3)

with open("girl names.txt", "r") as f4:
    lines4 = f4.readlines()
    print(lines4)


