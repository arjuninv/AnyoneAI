#%%
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--custom-js", help="Path to custom_blocks.js")
parser.add_argument("--labsHTML", help="Path to labs.js")
args = parser.parse_args()

if args.custom-js:
    CUSTOMJSPATH = str(args.custom-js)
if args.labsHTML:
    LABSHTMLPATH = str(args.labsHTML)

custom_js_file = open(CUSTOMJSPATH,'r')
custom_js = custom_js_file.read()
custom_js_file.close()
block_dictionary = {}
colors = []
# %%
while custom_js.count("//", 0, len(custom_js))  > 0:
    if custom_js.count("//", 0, len(custom_js)) == 1:
        current_block = custom_js
        custom_js = ""
    else:
        current_block = custom_js[0:custom_js.index("//", 1)]
        custom_js = custom_js[custom_js.index("//", 1):len(custom_js)]
    
    if "~$~" in current_block:
        colors.append(current_block[current_block.index("~$~",0)+3:current_block.index("~$~",0)+10])
        category = current_block[2:current_block.index('~$~')]
    else:
        category = current_block[2:current_block.index('\n')]
    
    block = current_block[current_block.index("[\'")+2:current_block.index("\']")]
    if block_dictionary.get(category) != None :
        block_dictionary[category].append(block)
        print("block added")
    else:
        block_dictionary[category] = [block]
        print("category added")
    

# %%
code = ""
color_index = 0
for i in block_dictionary.keys():
    code = code + "\n<category colour='"+colors[color_index].title()+"' name='"+i.title()+"'>"
    for j in block_dictionary[i]:
        code = code + "\n<block type='"+j.title()+"'></block>"
    code = code + "</category>"
    color_index += 1

# %%
labHTML_file = open(os.getcwd()+"/anyoneai/templates/lab.html",'r')
labHTML = labHTML_file.read()
labHTML_file.close()
# %%
old_code = labHTML[labHTML.index("<!-- custom blocks starts here -->") + 34: labHTML.index("<!-- custom blocks end here -->")]
labHTML = labHTML.replace(old_code, code)


# %%
labHTML_fil = open(LABSHTMLPATH, "w")
labHTML_fil.write(labHTML)
labHTML_fil.close()

