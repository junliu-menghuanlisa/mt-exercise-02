import os
import jieba
import random

target_dir = "tools/pytorch-examples/word_language_model/data/three_body"
os.makedirs(target_dir, exist_ok=True)
input_file = "santi.txt"

try:
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except UnicodeDecodeError:
        with open(input_file, 'r', encoding='gbk', errors='ignore') as f:
            lines = f.readlines()

    processed_lines = []
    for line in lines:
        if line.strip():
            words = jieba.cut(line.strip())
            processed_lines.append(" ".join(words) + "\n")

    random.shuffle(processed_lines)
    n = len(processed_lines)
    train_data = processed_lines[:int(n * 0.8)]
    valid_data = processed_lines[int(n * 0.8):int(n * 0.9)]
    test_data = processed_lines[int(n * 0.9):]

    def save_file(data, name):
        with open(os.path.join(target_dir, name), 'w', encoding='utf-8') as f:
            f.writelines(data)

    save_file(train_data, "train.txt")
    save_file(valid_data, "valid.txt")
    save_file(test_data, "test.txt")
    print("成功！编码已自动兼容，文件已生成。")

except Exception as e:
    print(f"发生错误: {e}")
