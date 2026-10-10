import os

file_path = r"F:\Seo personal\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_case_study = """
                <!-- Case 3 -->
                <div class="case-card">
                    <div class="case-visual">
                        <span class="case-emoji" style="display:flex;align-items:center;justify-content:center;">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                            </svg>
                        </span>
                    </div>
                    <div class="case-body">
                        <span class="case-tag" data-ar="نمو مجتمعي | تيك توك | سوشيال ميديا" data-en="Community Growth | TikTok | Social Media">نمو مجتمعي | تيك توك | سوشيال ميديا</span>
                        <h3 class="case-title" data-ar="سالي محمد — تحقيق أكثر من نصف مليون مشاهدة ونمو بنسبة 235%" data-en="Sally Mohamed — Over Half a Million Views and 235% Growth">سالي محمد — تحقيق أكثر من نصف مليون مشاهدة ونمو بنسبة 235%</h3>
                        <p class="case-desc" data-ar="استراتيجية نمو شاملة لحسابات سالي على تيك توك وفيسبوك، تستهدف الآباء والأمهات لأطفال التوحد. حققنا وصولاً عضوياً بنسبة 87.1% من غير المتابعين بفضل خطة المحتوى الفعالة (الريلز)." data-en="A comprehensive growth strategy for Sally's TikTok and Facebook accounts, targeting parents of children with autism. Achieved 87.1% organic reach from non-followers thanks to an effective content strategy (Reels).">استراتيجية نمو شاملة لحسابات سالي على تيك توك وفيسبوك، تستهدف الآباء والأمهات لأطفال التوحد. حققنا وصولاً عضوياً بنسبة 87.1% من غير المتابعين بفضل خطة المحتوى الفعالة (الريلز).</p>
                        <div class="case-stats">
                            <div class="case-stat">
                                <span class="case-stat-value">519K+</span>
                                <span class="case-stat-label" data-ar="مشاهدة" data-en="Views">مشاهدة</span>
                            </div>
                            <div class="case-stat">
                                <span class="case-stat-value">+235%</span>
                                <span class="case-stat-label" data-ar="معدل نمو" data-en="Growth Rate">معدل نمو</span>
                            </div>
                            <div class="case-stat">
                                <span class="case-stat-value">87%</span>
                                <span class="case-stat-label" data-ar="جمهور جديد" data-en="New Audience">جمهور جديد</span>
                            </div>
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 15px;">
                            <a href="https://www.tiktok.com/@colorbluess" target="_blank" class="btn-case" style="flex:1; text-align:center; padding: 0.5rem;" data-ar="حساب تيك توك" data-en="View TikTok">حساب تيك توك &rarr;</a>
                            <a href="https://www.instagram.com/colorbluesallymohamed" target="_blank" class="btn-case" style="flex:1; text-align:center; padding: 0.5rem; background:#E1306C; color:white; border-color:#E1306C;" data-ar="حساب انستجرام" data-en="View Instagram">حساب انستجرام &rarr;</a>
                        </div>
                    </div>
                </div>"""

target = """                </div>

            </div>
        </div>
    </div>


    <!-- ===================================================
         4. SERVICES"""

replacement = """                </div>
""" + new_case_study + """
            </div>
        </div>
    </div>


    <!-- ===================================================
         4. SERVICES"""

if target in content:
    new_content = content.replace(target, replacement, 1)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully added Case 3 to index.html safely!")
else:
    print("Target not found. Please verify the target string.")
