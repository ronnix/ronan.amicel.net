webpackJsonp([0x5f89018c81a1],{353:function(a,s){a.exports={data:{markdownRemark:{html:'<p>Mac OS X comes with bash as the default shell, but it does not include the very convenient completion functionality commonly available in Linux distributions. So here are the steps to enable it.</p>\n<p>First, you need to install the <strong>bash-completion</strong> package using the great <a href="http://mxcl.github.com/homebrew/">Homebrew</a> package manager:</p>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash">brew <span class="token function">install</span> bash-completion</code></pre>\n      </div>\n<p>Then, enable the completions for the <strong>brew</strong> command itself:</p>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">ln</span> -s <span class="token variable"><span class="token variable">`</span>brew --prefix<span class="token variable">`</span></span>/Library/Contributions/brew_bash_completion.sh <span class="token variable"><span class="token variable">`</span>brew --prefix<span class="token variable">`</span></span>/etc/bash_completion.d/</code></pre>\n      </div>\n<p>Now, edit your <strong>~/.bash_profile</strong> to add the following lines:</p>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">export</span> USER_BASH_COMPLETION_DIR<span class="token operator">=</span>~/.bash_completion.d\n<span class="token keyword">if</span> <span class="token punctuation">[</span> -f <span class="token variable"><span class="token variable">`</span>brew --prefix<span class="token variable">`</span></span>/etc/bash_completion <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>\n    <span class="token keyword">.</span> <span class="token variable"><span class="token variable">`</span>brew --prefix<span class="token variable">`</span></span>/etc/bash_completion\n<span class="token keyword">fi</span></code></pre>\n      </div>\n<p>Finally, create a file named <strong>~/.bash_completion</strong> with the following lines (this will allow you to add your own completion scripts in the <strong>~/.bash_completion.d/</strong> directory):</p>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token keyword">if</span> <span class="token punctuation">[</span> -d <span class="token variable">$USER_BASH_COMPLETION_DIR</span> -a -r <span class="token variable">$USER_BASH_COMPLETION_DIR</span> -a \\\n     -x <span class="token variable">$USER_BASH_COMPLETION_DIR</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>\n        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token variable">$USER_BASH_COMPLETION_DIR</span>/*<span class="token punctuation">;</span> <span class="token keyword">do</span>\n                <span class="token punctuation">[</span><span class="token punctuation">[</span> $<span class="token punctuation">{</span>i<span class="token comment">##*/} != @(*~|*.bak|*.swp|\\#*\\#|*.dpkg*|.rpm*) ]] &amp;&amp;</span>\n                        <span class="token punctuation">[</span> \\<span class="token punctuation">(</span> -f <span class="token variable">$i</span> -o -h <span class="token variable">$i</span> \\<span class="token punctuation">)</span> -a -r <span class="token variable">$i</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">.</span> <span class="token variable">$i</span>\n        <span class="token keyword">done</span>\n<span class="token keyword">fi</span>\nunset i</code></pre>\n      </div>\n<p>That’s it! All new shells will now be completion enabled.</p>',frontmatter:{title:"Enabling bash completions on Mac OS X",date:"2011-01-23",tags:["MacOS","Bash","Homebrew"]}}},pathContext:{slug:"/articles/enabling-bash-completions-on-mac-os-x/"}}}});
//# sourceMappingURL=path---articles-enabling-bash-completions-on-mac-os-x-c0f38e5857257bd3cd78.js.map