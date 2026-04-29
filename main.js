// ── NAV ──────────────────────────────────────────────────────────────────
function showSection(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => {
    if (t.textContent.toLowerCase().includes(id === 'teoria' ? 'teoría' : 'ejerc')) t.classList.add('active');
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── CONCEPTS ACCORDION ───────────────────────────────────────────────────
function toggleConcept(btn) {
  btn.classList.toggle('open');
  btn.nextElementSibling.classList.toggle('open');
}

// ── PROGRESS ─────────────────────────────────────────────────────────────
let solved = 0;
const TOTAL = 20;

function updateProgress() {
  const pct = Math.round(solved / TOTAL * 100);
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('ex-counter').textContent = solved + ' completado' + (solved !== 1 ? 's' : '');
  document.getElementById('nav-prog').textContent = solved + ' / ' + TOTAL;
  if (solved === TOTAL) document.getElementById('finish-banner').style.display = 'block';
}

// ── EXERCISES DATA ────────────────────────────────────────────────────────
const exercises = [
  {
    lv: 1, tag: 'Lectura',
    q: 'En la expresión <strong>7x³</strong>, ¿cuál es el coeficiente?',
    ph: 'Número',
    check: r => r.trim() === '7',
    ok: '✓ Correcto. El coeficiente es <strong>7</strong>, el número que multiplica a x³.',
    err: 'Incorrecto. El coeficiente es el número delante de la variable.',
    sol: { steps: '7x³ → el número que multiplica es 7', ans: 'Coeficiente = 7' }
  },
  {
    lv: 1, tag: 'Lectura',
    q: 'En la expresión <strong>−4x²</strong>, ¿cuál es el exponente de x?',
    ph: 'Número',
    check: r => r.trim() === '2',
    ok: '✓ Correcto. El exponente es <strong>2</strong>.',
    err: 'Incorrecto. El exponente es el número pequeño arriba a la derecha de x.',
    sol: { steps: '−4x² → el exponente de x es el 2 que aparece arriba', ans: 'Exponente = 2' }
  },
  {
    lv: 1, tag: 'Lectura',
    q: '¿Cuántos términos tiene el polinomio <strong>5x² − 3x + 8</strong>?',
    ph: 'Número',
    check: r => r.trim() === '3',
    ok: '✓ Correcto. Tiene <strong>3 términos</strong>: 5x², −3x y 8. Se llama trinomio.',
    err: 'Incorrecto. Contá los bloques separados por + o −.',
    sol: { steps: '5x²  |  −3x  |  8\n→ tres bloques = tres términos', ans: '3 términos (trinomio)' }
  },
  {
    lv: 1, tag: 'Lectura',
    q: '¿Cuál es el grado del término <strong>−9x⁵</strong>?',
    ph: 'Número',
    check: r => r.trim() === '5',
    ok: '✓ Correcto. El grado es <strong>5</strong>, el exponente de x.',
    err: 'Incorrecto. El grado de un término es su exponente.',
    sol: { steps: '−9x⁵ → el exponente de x es 5', ans: 'Grado = 5' }
  },
  {
    lv: 1, tag: 'Lectura',
    q: '¿Cuál es el grado del polinomio <strong>6x⁴ − 2x + 1</strong>?',
    ph: 'Número',
    check: r => r.trim() === '4',
    ok: '✓ Correcto. El grado mayor es <strong>4</strong>, el del término 6x⁴.',
    err: 'Incorrecto. El grado del polinomio es el mayor exponente que aparece.',
    sol: { steps: '6x⁴ → grado 4\n−2x → grado 1\n1 → grado 0\nEl mayor es 4', ans: 'Grado del polinomio = 4' }
  },

  {
    lv: 1, tag: 'Identificación',
    q: 'Indicá el <strong>término independiente</strong> del polinomio <strong>x² − 4x + 9</strong>.',
    ph: 'Número',
    check: r => r.trim() === '9',
    ok: '✓ Correcto. El 9 no tiene variable — es el término de grado 0.',
    err: 'Incorrecto. El término independiente es el número solo, sin x.',
    sol: { steps: 'x² → tiene variable\n−4x → tiene variable\n9 → sin variable → término independiente', ans: 'Término independiente = 9' }
  },
  {
    lv: 2, tag: 'Semejantes',
    q: '¿Son semejantes los términos <strong>3x²</strong> y <strong>5x²</strong>? Escribí <em>sí</em> o <em>no</em>.',
    ph: 'sí / no',
    check: r => r.toLowerCase().replace('í','i').trim() === 'si' || r.toLowerCase().trim() === 'sí',
    ok: '✓ Correcto. Ambos tienen x² → se pueden combinar.',
    err: 'Incorrecto. ¿Tienen la misma variable con el mismo exponente?',
    sol: { steps: '3x² → variable x, exponente 2\n5x² → variable x, exponente 2\nMismos → son semejantes', ans: 'Sí, son semejantes' }
  },
  {
    lv: 2, tag: 'Semejantes',
    q: '¿Son semejantes los términos <strong>4x²</strong> y <strong>4x</strong>? Escribí <em>sí</em> o <em>no</em>.',
    ph: 'sí / no',
    check: r => r.toLowerCase().trim() === 'no',
    ok: '✓ Correcto. 4x² tiene exponente 2 y 4x tiene exponente 1 → no son semejantes.',
    err: 'Incorrecto. Fijate en los exponentes: x² ≠ x¹.',
    sol: { steps: '4x² → exponente 2\n4x → exponente 1\nDiferente exponente → NO semejantes', ans: 'No, no son semejantes' }
  },
  {
    lv: 2, tag: 'Semejantes',
    q: 'Combiná los términos semejantes: <strong>5x + 3x</strong>',
    ph: 'Ej: 8x',
    check: r => r.replace(/\s/g,'').toLowerCase() === '8x',
    ok: '✓ Correcto. 5x + 3x = (5+3)x = <strong>8x</strong>.',
    err: 'Incorrecto. Sumá solo los coeficientes: 5 + 3. La x queda igual.',
    sol: { steps: '5x + 3x\n= (5+3)x', ans: '= 8x' }
  },
  {
    lv: 2, tag: 'Semejantes',
    q: 'Combiná los términos semejantes: <strong>7x² − 2x²</strong>',
    ph: 'Ej: 5x²',
    check: r => r.replace(/\s/g,'').replace('^2','²') === '5x²' || r.replace(/\s/g,'') === '5x^2',
    ok: '✓ Correcto. (7−2)x² = <strong>5x²</strong>.',
    err: 'Incorrecto. Restá los coeficientes: 7 − 2 = 5. El x² queda igual.',
    sol: { steps: '7x² − 2x²\n= (7−2)x²', ans: '= 5x²' }
  },

  {
    lv: 2, tag: 'Simplificación',
    q: 'Simplificá: <strong>3x + 5 + 2x − 1</strong>',
    ph: 'Ej: 5x+4',
    check: r => r.replace(/\s/g,'') === '5x+4',
    ok: '✓ Correcto. 3x+2x = 5x y 5−1 = 4. Resultado: <strong>5x + 4</strong>.',
    err: 'Incorrecto. Agrupá los x juntos y los números solos juntos.',
    sol: { steps: '3x + 5 + 2x − 1\n= (3x + 2x) + (5 − 1)\n= 5x + 4', ans: '5x + 4' }
  },
  {
    lv: 2, tag: 'Simplificación',
    q: 'Simplificá: <strong>4x² + 3x − x² + 2x</strong>',
    ph: 'Ej: 3x²+5x',
    check: r => {
      const n = r.replace(/\s/g,'');
      return n === '3x²+5x' || n === '3x^2+5x';
    },
    ok: '✓ Correcto. (4−1)x² = 3x² y (3+2)x = 5x. Resultado: <strong>3x² + 5x</strong>.',
    err: 'Incorrecto. Agrupá los x² juntos y los x juntos.',
    sol: { steps: '4x² + 3x − x² + 2x\n= (4x² − x²) + (3x + 2x)\n= 3x² + 5x', ans: '3x² + 5x' }
  },
  {
    lv: 3, tag: 'Evaluación',
    q: 'Evaluá <strong>f(x) = 3x + 2</strong> para <strong>x = 5</strong>.',
    ph: 'Número',
    check: r => parseFloat(r.replace(',','.')) === 17,
    ok: '✓ Correcto. f(5) = 3·5 + 2 = 15 + 2 = <strong>17</strong>.',
    err: 'Incorrecto. Reemplazá x=5: 3·5 + 2 = ?',
    sol: { steps: 'f(5) = 3·5 + 2\n= 15 + 2', ans: '= 17' }
  },
  {
    lv: 3, tag: 'Evaluación',
    q: 'Evaluá <strong>P(x) = x² − 4</strong> para <strong>x = 3</strong>.',
    ph: 'Número',
    check: r => parseFloat(r.replace(',','.')) === 5,
    ok: '✓ Correcto. P(3) = 3² − 4 = 9 − 4 = <strong>5</strong>.',
    err: 'Incorrecto. Primero calculá 3² = 9, luego restá 4.',
    sol: { steps: 'P(3) = (3)² − 4\n= 9 − 4', ans: '= 5' }
  },
  {
    lv: 3, tag: 'Evaluación',
    q: 'Evaluá <strong>Q(x) = 2x² + x − 3</strong> para <strong>x = 2</strong>.',
    ph: 'Número',
    check: r => parseFloat(r.replace(',','.')) === 7,
    ok: '✓ Correcto. Q(2) = 2·4 + 2 − 3 = 8 + 2 − 3 = <strong>7</strong>.',
    err: 'Incorrecto. Calculá 2²=4, luego 2·4=8, luego 8+2−3.',
    sol: { steps: 'Q(2) = 2(2)² + 2 − 3\n= 2·4 + 2 − 3\n= 8 + 2 − 3', ans: '= 7' }
  },

  {
    lv: 3, tag: 'Suma polinomios',
    q: 'Sumá: <strong>(2x² + 3x − 1) + (x² − 2x + 4)</strong>',
    ph: 'Ej: 3x²+x+3',
    check: r => {
      const n = r.replace(/\s/g,'');
      return n === '3x²+x+3' || n === '3x^2+x+3';
    },
    ok: '✓ Correcto. (2+1)x² + (3−2)x + (−1+4) = <strong>3x² + x + 3</strong>.',
    err: 'Incorrecto. Combiná los x², los x y los términos independientes por separado.',
    sol: { steps: '2x²+3x−1 + x²−2x+4\n= (2+1)x² + (3−2)x + (−1+4)', ans: '= 3x² + x + 3' }
  },
  {
    lv: 4, tag: 'Producto',
    q: 'Calculá el producto: <strong>(x + 3)(x + 2)</strong>',
    ph: 'Ej: x²+5x+6',
    check: r => {
      const n = r.replace(/\s/g,'');
      return n === 'x²+5x+6' || n === 'x^2+5x+6';
    },
    ok: '✓ Correcto. (x+3)(x+2) = x² + 2x + 3x + 6 = <strong>x² + 5x + 6</strong>.',
    err: 'Incorrecto. Multiplicá cada término del primer paréntesis por los del segundo.',
    sol: { steps: '(x+3)(x+2)\n= x·x + x·2 + 3·x + 3·2\n= x² + 2x + 3x + 6', ans: '= x² + 5x + 6' }
  },
  {
    lv: 4, tag: 'Factor común',
    q: 'Factorizá sacando factor común: <strong>6x³ + 9x²</strong>',
    ph: 'Ej: 3x²(2x+3)',
    check: r => {
      const n = r.replace(/\s/g,'');
      return n === '3x²(2x+3)' || n === '3x^2(2x+3)';
    },
    ok: '✓ Correcto. MCD(6,9)=3, menor exp=2 → <strong>3x²(2x + 3)</strong>.',
    err: 'Incorrecto. Buscá el MCD de los coeficientes y el menor exponente de x.',
    sol: { steps: '6x³ + 9x²\nMCD(6,9) = 3\nMenor exponente de x = 2\nFactor común = 3x²\n= 3x² · 2x + 3x² · 3', ans: '= 3x²(2x + 3)' }
  },
  {
    lv: 4, tag: 'Dif. cuadrados',
    q: 'Factorizá como diferencia de cuadrados: <strong>x² − 25</strong>',
    ph: 'Ej: (x+5)(x-5)',
    check: r => {
      const n = r.replace(/\s/g,'').replace(/−/g,'-');
      return n === '(x+5)(x-5)' || n === '(x-5)(x+5)';
    },
    ok: '✓ Correcto. x² − 25 = x² − 5² = <strong>(x+5)(x−5)</strong>.',
    err: 'Incorrecto. Usá a²−b²=(a+b)(a−b). Acá a=x y b=5.',
    sol: { steps: 'x² − 25 = x² − 5²\na²−b² = (a+b)(a−b)\na=x, b=5', ans: '= (x+5)(x−5)' }
  },
  {
    lv: 4, tag: 'Trinomio',
    q: 'Factorizá: <strong>x² + 7x + 12</strong>',
    ph: 'Ej: (x+3)(x+4)',
    check: r => {
      const n = r.replace(/\s/g,'');
      return n === '(x+3)(x+4)' || n === '(x+4)(x+3)';
    },
    ok: '✓ Correcto. 3+4=7 y 3×4=12 → <strong>(x+3)(x+4)</strong>.',
    err: 'Incorrecto. Buscá dos números que sumen 7 y multipliquen 12.',
    sol: { steps: 'x² + 7x + 12\nBuscamos a+b=7 y a·b=12\nProbamos: 3+4=7 ✓ y 3×4=12 ✓', ans: '= (x+3)(x+4)' }
  }
];

const levelLabels = { 1: 'Básico', 2: 'Elemental', 3: 'Intermedio', 4: 'Avanzado' };
const levelClass  = { 1: 'lvl-1', 2: 'lvl-2', 3: 'lvl-3', 4: 'lvl-4' };

// ── RENDER ────────────────────────────────────────────────────────────────────
function buildExercises() {
  const list = document.getElementById('ex-list');
  list.innerHTML = '';
  exercises.forEach((ex, i) => {
    const id = i + 1;
    const card = document.createElement('div');
    card.className = 'ex-card';
    card.id = `card-${id}`;
    card.innerHTML = `
      <div class="ex-top">
        <span class="ex-badge">Ejercicio ${String(id).padStart(2,'0')} / ${TOTAL}</span>
        <span style="font-size:.75rem;color:var(--ink3)">${ex.tag}</span>
        <span class="ex-lvl ${levelClass[ex.lv]}">${levelLabels[ex.lv]}</span>
      </div>
      <div class="ex-body">
        <div class="ex-q">${ex.q}</div>
        <div class="input-row">
          <input class="ex-input" id="inp-${id}" placeholder="${ex.ph}"
            onkeydown="if(event.key==='Enter') verify(${id})">
          <button class="btn-check" id="btn-${id}" onclick="verify(${id})">Verificar</button>
        </div>
        <div class="fb-wrap" id="fb-${id}">
          <div id="fb-ok-${id}" class="fb-ok" style="display:none"></div>
          <div id="fb-err-${id}" class="fb-err" style="display:none"></div>
          <div class="solution" id="sol-${id}">
            <div class="solution-title">Solución paso a paso</div>
            <div class="sol-steps">${ex.sol.steps}</div>
            <div class="sol-final">→ ${ex.sol.ans}</div>
          </div>
          <button class="btn-retry" id="retry-${id}" onclick="retry(${id})" style="display:none">Intentar de nuevo</button>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
}

function verify(id) {
  const ex = exercises[id - 1];
  const raw = document.getElementById(`inp-${id}`).value;
  const correct = ex.check(raw);
  const card = document.getElementById(`card-${id}`);
  const fbWrap = document.getElementById(`fb-${id}`);

  // show feedback area
  fbWrap.style.display = 'block';
  document.getElementById(`sol-${id}`).style.display = 'block';

  if (correct) {
    document.getElementById(`fb-ok-${id}`).innerHTML = ex.ok;
    document.getElementById(`fb-ok-${id}`).style.display = 'block';
    document.getElementById(`fb-err-${id}`).style.display = 'none';
    document.getElementById(`retry-${id}`).style.display = 'none';

    if (!card.dataset.solved) {
      card.dataset.solved = '1';
      card.classList.add('solved');
      card.classList.remove('attempted');
      document.getElementById(`inp-${id}`).disabled = true;
      document.getElementById(`btn-${id}`).disabled = true;
      solved++;
      updateProgress();
    }
  } else {
    document.getElementById(`fb-err-${id}`).textContent = ex.err;
    document.getElementById(`fb-err-${id}`).style.display = 'block';
    document.getElementById(`fb-ok-${id}`).style.display = 'none';
    document.getElementById(`retry-${id}`).style.display = 'inline-block';
    card.classList.add('attempted');
  }
}

function retry(id) {
  const inp = document.getElementById(`inp-${id}`);
  inp.value = '';
  inp.focus();
  document.getElementById(`fb-${id}`).style.display = 'none';
  document.getElementById(`sol-${id}`).style.display = 'none';
  document.getElementById(`fb-ok-${id}`).style.display = 'none';
  document.getElementById(`fb-err-${id}`).style.display = 'none';
  document.getElementById(`retry-${id}`).style.display = 'none';
}

// ── INIT ──────────────────────────────────────────────────────────────────────
buildExercises();
updateProgress();
