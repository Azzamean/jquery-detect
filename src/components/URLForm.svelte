<script lang="ts">
  import loadingImg from '../assets/images/loading.svg'
  const action = '/detect.json'
  const method = 'POST'

  let inputUrl = ''
  let version: string | undefined = ''

  let loading = false
  let invalid = false
  let message: string | undefined

  async function submitUrl(url: string) {
    if (!url) {
      invalid = true
      return
    }

    // Reset states
    loading = true
    invalid = false
    message = version = ''

    try {
      const res = await fetch(action, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })
      if (res.ok) {
        const json = await res.json()
        message = json.message
        version = json.version
      } else {
        try {
          const json = await res.json()
          message = json.message
        } catch (e) {
          message = res.statusText
        }
      }
    } catch (error) {
      console.error(error)
      message = 'Error communicating with server. Please refresh and try again.'
    } finally {
      loading = false
    }
    var x = document.querySelectorAll(".version")
    var i
    for (i = 0; i < x.length; i++) {
        x[i].innerHTML += version
    }
  }
</script>

<form class="flex-column" on:submit|preventDefault={() => submitUrl(inputUrl)}>
  <div class="flex-row input-wrap">
    <input
      required
      bind:value={inputUrl}
      class:invalid
      type="text"
      name="url"
      id="url"
      placeholder="https://"
      on:paste={(e) => {
        const value = e.clipboardData?.getData('text')
        if (value) {
          submitUrl(value)
        }
      }}
    />
    <button type="submit" class="flex-center" class:loading disabled={loading}>
      <img
        src={loadingImg.src}
        alt="loading"
        class="loading-image"
        width={18}
        height={18}
      />
      <span>Check Now</span>
    </button>
  </div>
</form>

<!-- DOUBLE CHECK WITH CHROME COMMAND CONSOLE console.log(jQuery().jquery); -->
{#if version == "3.7.1"}
  <!-- CURRENT VERSION: https://www.linux.com/ -->
  <script lang="ts">
    intro.classList.remove('display')
    intro.classList.add('hide')

    current.classList.remove('hide')
    current.classList.add('display')
  </script>
{:else if version != undefined && version != "" && version < "3.7.1"}
  <!-- OLD VERSION: https://www.sellercommunity.com/ -->
  <script lang="ts">
    intro.classList.remove('display')
    intro.classList.add('hide')

    past.classList.remove('hide')
    past.classList.add('display')
  </script>
{:else if !loading && version === undefined && message == undefined}
  <!-- NO VERSION: https://youmightnotneedjquery.com/ -->
  <script lang="ts">
    intro.classList.remove('display')
    intro.classList.add('hide')

    noversion.classList.remove('hide')
    noversion.classList.add('display')
  </script>
{:else if !loading && version === undefined && message != undefined}
  <!-- NO WEBSITE: https://thissiteobviouslydoesntexist.com/ -->
  <script lang="ts">
    intro.classList.remove('display')
    intro.classList.add('hide')

    nosite.classList.remove('hide')
    nosite.classList.add('display')
  </script>
{/if}

<style>
  .input-wrap {
    gap: 10px;
  }
  input.invalid {
    background-color: rgba(255, 0, 0, 0.1);
  }
  button .loading-image {
    display: none;
    position: absolute;
  }
  button.loading .loading-image {
    display: block;
  }
  button.loading span {
    visibility: hidden;
  }
  .result,
  .message {
    color: var(--current-color);
    padding: 10px 20px;
    background-color: var(--border-color);
    border-radius: var(--border-radius);
  }
  .result {
    font-size: 2em;
  }
</style>
