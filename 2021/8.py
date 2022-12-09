with open('8-input.txt') as f:
    lines = f.readlines()

arr = []
counter = 0

for line in lines:
    split = line.split('|')[1]
    sub_arr = split.strip().split(' ')
    arr.append(sub_arr)

for sub_arr in arr:
    for string in sub_arr:
        if len(string) == 2 or len(string) == 3 or len(string) == 4 or len(string) == 7:
            counter += 1

print(counter) # part one answer

def is_anagram(string1, string2):
    if len(string1) != len(string2):
        return False

    dict1 = {}
    dict2 = {}

    for char in string1:
        if char not in dict1:
            dict1[char] = 1
        else:
            dict1[char] += 1

    for char in string2:
        if char not in dict2:
            dict2[char] = 1
        else:
            dict2[char] += 1

    if dict1 == dict2:
        return True
    return False

def at_least_n_substring(string1, string2, n):
    count = 0

    for char in string2:
        if char in string1:
            count += 1

    return count >= n

def determine_pattern(line):
    pattern_table = {}
    pattern_list = [i for i in range(10)]
    line_list = line.strip().split(' ')

    for string in line_list:
        match len(string):
            case 2:
                # pattern_table[string] = 1
                pattern_list[1] = string
            case 3:
                # pattern_table[string] = 7
                pattern_list[7] = string
            case 4:
                # pattern_table[string] = 4
                pattern_list[4] = string
            case 7:
                # pattern_table[string] = 8
                pattern_list[8] = string

    for string in line_list:
        if len(string) == 5:
            # find the 3
            if pattern_list[1][0] in string and pattern_list[1][1] in string:
                # pattern_table[string] = 3
                pattern_list[3] = string
            # find the 5
            elif at_least_n_substring(string, pattern_list[4], 3):
                # pattern_table[string] = 5
                pattern_list[5] = string
            # find the 2
            else:
                # pattern_table[string] = 2
                pattern_list[2] = string

    for string in line_list:
        if len(string) == 6:
            if at_least_n_substring(string, pattern_list[4], 4):
                pattern_list[9] = string
            elif pattern_list[1][0] in string and pattern_list[1][1] in string:
                pattern_list[0] = string
            else:
                pattern_list[6] = string

    for i, string in enumerate(pattern_list):
        pattern_table[string] = i

    # print(pattern_table)
    return pattern_table

# determine_pattern('cg fadegbc ecfadb acdbeg abgfe dcegfb gcad bceag debca bgc ')

def decode_line(line):
    signal, output = line.split('|')
    output_arr = output.strip().split(' ')
    
    # print(output_arr)
    pattern_table = determine_pattern(signal)

    num = ''
    for string in output_arr:
        for pattern in pattern_table:
            if is_anagram(pattern, string):
                num += str(pattern_table[pattern])

    return int(num)

decode_line('fgcedb fagbe aecgbd gbcaf bef fade fagdecb aebdg ef feadbg | abdge abfdge abcgf gabedc \n')

total = 0

for line in lines:
    total += decode_line(line)

print(total) # part two answer
